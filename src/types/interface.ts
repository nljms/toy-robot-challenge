import { Command, Direction } from './enum';

export interface Robot {
  move: () => void;
  turnLeft: () => void;
  turnRight: () => void;
  report: () => void;
}

interface RobotInfo {
  coordinates: Coordinates;
  command: Command;
  direction: Direction;
}

export interface TableConfig {
  height: number;
  width: number;
}

export interface Table {
  isOutOfBounds: (position: Coordinates) => boolean;
}

export interface CommandLine {
  chooseInput: () => void;
  run: () => void;
}

export interface Logger {
  info: (...message: any) => void;
  error: (...message: any) => void;
  output: (...message: any) => void;
}

export interface InitialPosition extends Coordinates {
  direction: Direction;
}

export type ValueOf<T> = T[keyof T];

export interface ParsedPosition extends Coordinates {
  direction: ValueOf<Direction>;
}

export interface Parser {
  parse: (rawCommand: string) => ParsedCommand;
  isInvalidCommand: (rawCommand: string) => boolean;
  getCommand: (rawCommand: string) => Command;
  getCoordinates: (rawCommand: string) => Coordinates;
  getDirection: (rawCommand: string) => Direction;
}

export interface User {
  id: number;
  robot: Robot;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ParsedCommandResult {
  command: Command;
  position: ParsedPosition;
}

export interface ParsedCommand {
  command: Command;
  coordinates?: Coordinates;
  direction?: Direction;
  user?: Partial<User>;
}

interface Store<Type> {
  save: (info: Partial<Type>) => void;
}

export interface RobotStore extends Store<RobotInfo> {}

export interface UserStore extends Store<User> {}
