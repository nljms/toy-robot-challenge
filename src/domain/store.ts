import ParseInstructionCommand from '../commands/parseInstruction';
import { InvalidCommandException } from '../errors';
import { Direction, ParsedCommand } from '../types';
import { ConsoleLogger } from '../utils';

class RobotMovementStore {
  constructor(private readonly logger: ConsoleLogger) {}

  public static movementLog: ParsedCommand[] = [];

  /**
   * Stores the command in a state history
   * @param command
   * @returns void
   */
  public save = (parsedCommand: ParsedCommand | null) => {
    if (!parsedCommand) {
      return;
    }

    RobotMovementStore.movementLog.push(parsedCommand);
  };

  public report = () => {
    const DIRECTIONS = Object.values(Direction);
    const lastIndex = RobotMovementStore.movementLog.length - 1;
    const { [lastIndex]: result } = RobotMovementStore.movementLog.map(
      (log) => ({
        ...log,
        position: {
          x: log.position?.x,
          y: log.position?.y,
          direction: DIRECTIONS[log.position?.direction as number],
        },
      })
    );
    this.logger.output(result.position);
  };
}

export default RobotMovementStore;
