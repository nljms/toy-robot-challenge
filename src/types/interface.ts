import { Command, Direction } from './enum';

export interface Robot {
  move: () => void;
  turnLeft: () => void;
  turnRight: () => void;
  report: () => string;
}

export interface Position {
  x: number;
  y: number;
}

export interface TableConfig {
  height: number;
  width: number;
}

export interface Table {}

export interface Cli {}

export interface Move {}

export interface Report {}

export interface Logger {
  info: (message: any) => void;
  error: (message: any) => void;
}

export interface InitialPosition extends Position {
  direction: Direction;
}

export type ValueOf<T> = T[keyof T];

export interface ParsedPosition extends Position {
  direction: ValueOf<Direction>;
}

export interface ParsedCommandResult {
  command: Command;
  position: ParsedPosition;
}

export interface ParsedCommand {
  command: Command;
  position?: InitialPosition;
}
