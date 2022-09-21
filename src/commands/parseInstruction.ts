import RobotMovementStore from '../domain/store';
import { Command, Direction, ParsedCommand } from '../types';

class ParseInstructionCommand {
  private initialCommandPattern = /PLACE\s\S{5}/;
  private commandPattern = /MOVE|LEFT|RIGHT|REPORT/;

  private clean = (command: string): Command => command.trim() as Command;

  private splitValues =
    (delimiter: string) =>
    (command: string): string[] =>
      command.split(delimiter);

  /**
   * Checks wether the provided command is
   * @param command
   * @returns boolean
   */
  private isValidCommand = (command: string): boolean => {
    switch (RobotMovementStore.movementLog.length) {
      case 0:
        return this.initialCommandPattern.test(command);

      default:
        return this.commandPattern.test(command);
    }
  };

  public execute = (rawCommand: string): ParsedCommand | null => {
    if (!this.isValidCommand(rawCommand)) {
      return null;
    }

    const splitCommand = this.splitValues(' ');
    const splitInitialPosition = this.splitValues(',');
    const [command, initialPosition] = splitCommand(this.clean(rawCommand));

    if (!initialPosition) {
      return {
        command: command as Command,
      };
    }

    const [x, y, direction] = splitInitialPosition(this.clean(initialPosition));

    if ([x, y].some((arg) => isNaN(Number(arg)))) {
      return null;
    }

    const parsedDirection = !isNaN(Number(direction))
      ? Number(direction)
      : Direction[direction.toUpperCase() as any];

    return {
      command: command as Command,
      position: {
        x: Number(x),
        y: Number(y),
        direction: parsedDirection as Direction,
      },
    };
  };
}

export default ParseInstructionCommand;
