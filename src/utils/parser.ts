import InvalidInputException from '../errors/InvalidInputException';
import {
  Command,
  Parser,
  Coordinates,
  Direction,
  ParsedCommand,
  User,
} from '../types';

class InputParser implements Parser {
  constructor() {}

  /**
   * Ranges from 0 to 255
   */
  private numberPattern =
    /\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b/;

  private coordinateRegexP = new RegExp(
    `${this.numberPattern.source},${this.numberPattern.source}`
  );

  private commandRegexP = /PLACE|MOVE|LEFT|RIGHT|REPORT/;
  private directionPattern = /NORTH|SOUTH|EAST|WEST/;

  private isNotAllNumber = (...numbers: number[]) => {
    return numbers.some(isNaN);
  };

  private match = (rawInput: string, pattern: RegExp) => {
    const { [0]: result } = rawInput.match(pattern) || [];

    if (!result) {
      throw new InvalidInputException();
    }

    return result;
  };

  private cleanParsedCommand = (rawParsedCommand: ParsedCommand) => {
    const entries = Object.entries(rawParsedCommand);
    return entries.reduce((previous, current) => {
      const [key, value] = current;
      if (value === undefined) {
        return previous;
      }
      return {
        ...previous,
        [key]: value,
      };
    }, {} as ParsedCommand);
  };

  public getCommand = (rawInput: string): Command => {
    return this.match(rawInput, this.commandRegexP) as Command;
  };

  public getCoordinates = (rawInput: string): Coordinates => {
    const result = this.match(rawInput, this.coordinateRegexP);
    const [x, y] = result.split(',').map(Number);

    if (this.isNotAllNumber(x, y)) {
      throw new InvalidInputException(
        'Invalid input! Coordinates should be a number'
      );
    }

    return { x, y };
  };

  public getDirection = (rawInput: string): Direction => {
    const directionName = this.match(rawInput, this.directionPattern);

    return Object.values(Direction).indexOf(directionName);
  };

  public getUser = (rawCommand: string): Partial<User> | undefined => {
    const id = rawCommand.replace(`${Command.Move} `, '');
    if (!id) {
      return;
    }

    return { id: Number(id) };
  };

  /**
   * Handles parsing of an input coming from the terminal
   * @param rawInput
   * @returns a ParsedCommand
   */
  public parse = (rawInput: string): ParsedCommand => {
    const command = this.getCommand(rawInput);
    let coordinates: Coordinates | undefined,
      user: Partial<User> | undefined,
      direction: Direction | undefined;

    switch (command) {
      case Command.Place:
        coordinates = this.getCoordinates(rawInput);
        direction = this.getDirection(rawInput);
        break;
      case Command.Move:
        user = this.getUser(rawInput);
      default:
        break;
    }

    return this.cleanParsedCommand({
      command,
      user,
      coordinates,
      direction,
    });
  };

  public isInvalidCommand = (rawCommand: string) => false;
}

export default InputParser;
