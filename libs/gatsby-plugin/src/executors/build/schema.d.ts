export interface BuildExecutorSchema {
  prefixPaths?: boolean;
  uglify?: boolean;
  profile?: boolean;
  openTracingConfigFile?: string;
  graphqlTracing?: boolean;
  color?: boolean;
}
