import { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
import { fork } from 'child_process';
import { join } from 'path';

export default async function buildExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  const projectName = context.projectName;
  if (!projectName) {
    throw new Error('Build executor requires a project name.');
  }

  const projectRoot = context.projectsConfigurations.projects[projectName].root;
  await runGatsbyBuild(context.root, projectRoot, projectName, options);

  return { success: true };
}

export function runGatsbyBuild(
  workspaceRoot: string,
  projectRoot: string,
  projectName: string,
  options: BuildExecutorSchema
) {
  return new Promise<void>((resolve, reject) => {
    const cp = fork(
      require.resolve('gatsby-cli'),
      ['build', ...createGatsbyBuildOptions(options)],
      {
        cwd: join(workspaceRoot, projectRoot),
        stdio: 'inherit',
      }
    );

    // Ensure the child process is killed when the parent exits
    process.on('exit', () => cp.kill());
    process.on('SIGTERM', () => cp.kill());

    cp.on('error', err => {
      reject(err);
    });

    cp.on('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`Could not build "${projectName}". See errors above.`)
        );
      }
    });
  });
}

function createGatsbyBuildOptions(options: BuildExecutorSchema): string[] {
  const args: string[] = [];
  if (options.prefixPaths) {
    args.push('--prefix-paths');
  }
  if (options.uglify === false) {
    args.push('--no-uglify');
  }
  if (options.color === false) {
    args.push('--no-color');
  }
  if (options.profile) {
    args.push('--profile');
  }
  if (options.openTracingConfigFile) {
    args.push('--open-tracing-config-file', options.openTracingConfigFile);
  }
  if (options.graphqlTracing) {
    args.push('--graphql-tracing');
  }
  return args;
}
