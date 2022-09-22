import { Command, Direction, InitialPosition, Robot } from '../types';
import RobotMovementStore from './store';

class ToyRobot implements Robot {
  public currentPosition: InitialPosition;

  constructor(
    private readonly store: RobotMovementStore,
    private readonly initialPosition: InitialPosition
  ) {
    this.currentPosition = this.initialPosition;
    this.store.save(this.toParsedCommand(Command.Place));
  }

  public report = () => {
    this.store.report();
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
    this.store.save(this.toParsedCommand(Command.Move));
  };

  public turnLeft(): Direction {
    this.currentPosition.direction =
      this.currentPosition.direction === Direction.NORTH
        ? Direction.WEST
        : this.currentPosition.direction - 1;

    this.store.save(this.toParsedCommand(Command.Left));
    return this.currentPosition.direction;
  }

  public turnRight(): Direction {
    this.currentPosition.direction =
      this.currentPosition.direction === Direction.WEST
        ? Direction.NORTH
        : this.currentPosition.direction + 1;

    this.store.save(this.toParsedCommand(Command.Right));
    return this.currentPosition.direction;
  }

  public toParsedCommand(command: Command) {
    return {
      command,
      position: {
        x: this.currentPosition.x,
        y: this.currentPosition.y,
        direction: this.currentPosition.direction,
      },
    };
  }
}

export default ToyRobot;
