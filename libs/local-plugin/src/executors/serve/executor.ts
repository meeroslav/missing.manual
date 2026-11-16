import {
  ExecutorContext,
  parseTargetString,
  readTargetOptions,
} from '@nx/devkit';
import { ChildProcess, fork } from 'child_process';
import { join } from 'path';
import { runGatsbyBuild } from '../build/executor';
import { BuildExecutorSchema } from '../build/schema';
import { ServeExecutorSchema } from './schema';

interface GatsbyActivityPayload {
  status?: string;
  id?: string;
  text?: string;
}

interface GatsbyIpcMessage {
  action?: {
    type?: string;
    payload?: GatsbyActivityPayload;
  };
}

export default async function* serverExecutor(
  options: ServeExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName;
  if (!projectName) {
    throw new Error('Serve executor requires a project name.');
  }

  const project = context.projectsConfigurations.projects[projectName];
  if (!project) {
    throw new Error(`Could not find project "${projectName}".`);
  }

  if (!options.buildTarget) {
    throw new Error('Serve executor requires a buildTarget.');
  }

  const serveOptions = normalizeOptions(options);
  const buildTarget = parseTargetString(serveOptions.buildTarget, context);
  const baseUrl = `${serveOptions.https ? 'https' : 'http'}://${
    serveOptions.host
  }:${serveOptions.port}`;
  const buildOptions = readTargetOptions<BuildExecutorSchema>(
    buildTarget,
    context
  );

  let child: ChildProcess | undefined;

  try {
    if (context.configurationName === 'production') {
      await runGatsbyBuild(
        context.root,
        project.root,
        projectName,
        buildOptions
      );

      const serve = startGatsbyServe(context.root, project.root, serveOptions);
      child = serve.child;
      const readyUrl = await serve.ready;

      yield { baseUrl: readyUrl ?? baseUrl, success: true };
    } else {
      const develop = startGatsbyDevelop(
        context.root,
        project.root,
        serveOptions
      );
      child = develop.child;
      const ready = await develop.ready;

      yield { baseUrl: ready.baseUrl ?? baseUrl, success: ready.success };
    }

    // Keep the server up until Nx closes this generator.
    await new Promise<void>(() => {
      return;
    });
  } finally {
    if (child && child.exitCode === null) {
      child.kill();
    }
  }
}

function normalizeOptions(options: ServeExecutorSchema): ServeExecutorSchema {
  return {
    ...options,
    host: options.host || 'localhost',
    port: options.port ?? 4200,
    https: !!options.https,
    open: !!options.open,
  };
}

function createGatsbyDevelopArgs(options: ServeExecutorSchema): string[] {
  const args = [`--host=${options.host}`, `--port=${options.port}`];
  if (options.https) {
    args.push('--https');
  }
  if (options.open) {
    args.push('--open');
  }
  return args;
}

function createGatsbyServeArgs(options: ServeExecutorSchema): string[] {
  const args = ['--host', options.host, '--port', String(options.port)];
  if (options.open) {
    args.push('--open');
  }
  if (options.prefixPaths) {
    args.push('--prefix-paths');
  }
  return args;
}

function startGatsbyDevelop(
  workspaceRoot: string,
  projectRoot: string,
  options: ServeExecutorSchema
): {
  child: ChildProcess;
  ready: Promise<{ success: boolean; baseUrl?: string }>;
} {
  const child = fork(
    require.resolve('gatsby-cli'),
    ['develop', ...createGatsbyDevelopArgs(options)],
    {
      cwd: join(workspaceRoot, projectRoot),
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    }
  );

  const ready = new Promise<{ success: boolean; baseUrl?: string }>(
    (resolve, reject) => {
      const outcome = once<{ success: boolean; baseUrl?: string }>(
        resolve,
        reject
      );
      let baseUrl: string | undefined;

      child.on('message', (message: unknown) => {
        const action = readGatsbyAction(message);
        const text = action?.payload?.text;
        if (action?.type === 'LOG' && text) {
          baseUrl = baseUrl ?? listeningUrl(text);
        }
        if (
          action?.type === 'ACTIVITY_END' &&
          action.payload?.id === 'webpack-develop' &&
          action.payload.status === 'SUCCESS'
        ) {
          outcome.resolve({ success: true, baseUrl });
        }
      });

      child.on('error', err => {
        outcome.reject(err);
      });

      child.on('exit', code => {
        outcome.reject(
          new Error(
            `Could not start Gatsby Development Server. See errors above. Exit code: ${
              code ?? 'null'
            }.`
          )
        );
      });
    }
  );

  return { child, ready };
}

function startGatsbyServe(
  workspaceRoot: string,
  projectRoot: string,
  options: ServeExecutorSchema
): { child: ChildProcess; ready: Promise<string | undefined> } {
  const child = fork(
    require.resolve('gatsby-cli'),
    ['serve', ...createGatsbyServeArgs(options)],
    {
      cwd: join(workspaceRoot, projectRoot),
      // Inherit output so Gatsby logs are visible, and keep IPC so the
      // reporter can signal that the server is listening.
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    }
  );

  const ready = new Promise<string | undefined>((resolve, reject) => {
    const outcome = once<string | undefined>(resolve, reject);

    child.on('message', (message: unknown) => {
      const action = readGatsbyAction(message);
      const text = action?.payload?.text;
      if (action?.type !== 'LOG' || !text) {
        return;
      }

      const url = listeningUrl(text);
      if (url) {
        outcome.resolve(url);
      }
    });

    child.on('error', err => {
      outcome.reject(err);
    });

    child.on('exit', code => {
      outcome.reject(
        new Error(
          `Could not start Gatsby Production Server. See errors above. Exit code: ${
            code ?? 'null'
          }.`
        )
      );
    });
  });

  return { child, ready };
}

function listeningUrl(text: string): string | undefined {
  const match = text.match(/https?:\/\/[^\s/]+:\d+/);
  return match?.[0];
}

function readGatsbyAction(message: unknown): GatsbyIpcMessage['action'] {
  if (!message || typeof message !== 'object' || !('action' in message)) {
    return undefined;
  }

  const action = (message as GatsbyIpcMessage).action;
  if (!action || typeof action !== 'object') {
    return undefined;
  }

  return action;
}

function once<T>(
  resolve: (value: T) => void,
  reject: (error: Error) => void
): { resolve: (value: T) => void; reject: (error: Error) => void } {
  let settled = false;

  return {
    resolve: value => {
      if (settled) return;
      settled = true;
      resolve(value);
    },
    reject: error => {
      if (settled) return;
      settled = true;
      reject(error);
    },
  };
}
