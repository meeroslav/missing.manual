export interface ServeExecutorSchema {
  buildTarget: string;
  host: string;
  port: number;
  open?: boolean;
  https?: boolean;
  prefixPaths?: boolean;
}
