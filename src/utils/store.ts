import { InvalidMovementException } from '../errors';
import { Direction, ParsedCommand } from '../types';
import { ConsoleLogger } from '../utils';
import Table from '../domain/table';

class RobotMovementStore {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly table: Table
  ) {}

  public static movementLog: ParsedCommand[] = [];

  /**
   * Stores the command in a state history
   * @param command
   * @returns void
   */
  public save = (parsedCommand: ParsedCommand | null) => {
    this.logger.info('Saving parsed command', parsedCommand);
    if (!parsedCommand || !parsedCommand.coordinates) {
      return;
    }

    if (this.table.isOutOfBounds(parsedCommand.coordinates)) {
      throw new InvalidMovementException();
    }

    RobotMovementStore.movementLog.push(parsedCommand);
  };

  public static fetchLatestLog = () => {
    const DIRECTIONS = Object.values(Direction);
    const lastIndex = RobotMovementStore.movementLog.length - 1;
    const { [lastIndex]: result } = RobotMovementStore.movementLog.map(
      (log) => ({
        ...log,
        coordinates: {
          x: log.coordinates?.x,
          y: log.coordinates?.y,
        },
        direction: DIRECTIONS[log.direction as number],
      })
    );
    return result;
  };
}

export default RobotMovementStore;
