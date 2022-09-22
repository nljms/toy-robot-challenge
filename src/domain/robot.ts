import { Command, Direction, InitialPosition, Logger, Robot } from '../types';
import RobotMovementStore from '../utils/store';

class ToyRobot implements Robot {
  public currentPosition: InitialPosition;

  constructor(
    private readonly store: RobotMovementStore,
    private readonly initialPosition: InitialPosition,
    private readonly logger: Logger
  ) {
    this.currentPosition = this.initialPosition;
    this.store.save(this.toParsedCommand(Command.Place));
  }

  public report = () => {
    const directionName =
      Object.values(Direction)[this.currentPosition.direction];
    const position = {
      ...this.currentPosition,
      direction: directionName,
    };

    const report = Object.values(position).join(',');

    this.logger.output(report);

    return report;
  };

  public move = () => {
    const { direction } = this.currentPosition;
    switch (direction) {
      case Direction.NORTH:
        this.currentPosition.y += 1;
        break;
      case Direction.EAST:
        this.currentPosition.x += 1;
        break;
      case Direction.SOUTH:
        this.currentPosition.y -= 1;
        break;
      case Direction.WEST:
        this.currentPosition.x -= 1;
    }
    console.log(direction);
    this.store.save(this.toParsedCommand(Command.Move));
    return this;
  };

  public turnLeft() {
    this.currentPosition.direction =
      this.currentPosition.direction === Direction.NORTH
        ? Direction.WEST
        : this.currentPosition.direction - 1;

    this.store.save(this.toParsedCommand(Command.Left));
    return this;
  }

  public turnRight() {
    this.currentPosition.direction =
      this.currentPosition.direction === Direction.WEST
        ? Direction.NORTH
        : this.currentPosition.direction + 1;

    this.store.save(this.toParsedCommand(Command.Right));
    return this;
  }

  public toParsedCommand(command: Command) {
    return {
      command,
      coordinates: {
        x: this.currentPosition.x,
        y: this.currentPosition.y,
      },
      direction: this.currentPosition.direction,
    };
  }
}

export default ToyRobot;
