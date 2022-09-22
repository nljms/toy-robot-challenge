import { InvalidMovementException } from '../errors';
import { Direction, ParsedCommand } from '../types';
import { ConsoleLogger } from '../utils';
import Table from './table';

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
    if (!parsedCommand || !parsedCommand.position) {
      return;
    }

    if (this.table.isOutOfBounds(parsedCommand.position)) {
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
        position: {
          x: log.position?.x,
          y: log.position?.y,
          direction: DIRECTIONS[log.position?.direction as number],
        },
      })
    );
    return result;
  };

  public report = () => {
    const result = RobotMovementStore.fetchLatestLog();
    this.logger.output(result.position);
  };
}

export default RobotMovementStore;
