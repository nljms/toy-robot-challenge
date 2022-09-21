export interface Robot {}

export interface Table {}

export interface Cli {}

export interface Move {}

export interface Report {}

export interface Logger {
  info: (message: any) => void;
  error: (message: any) => void;
}

export enum CliArgs {
  i = 'Input',
  d = 'Directory',
}
