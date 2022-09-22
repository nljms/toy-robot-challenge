import ParseInstructionCommand from './parseInstruction';
import { Command, ParsedCommand, Robot } from '../types';
import { ConsoleLogger } from '../utils';
import ToyRobot from '../domain/robot';
import RobotMovementStore from '../utils/store';
import { TableSurface } from '../domain';

class CommandRobot {
  private robot: Robot | undefined;

  constructor(private readonly parseCommand: ParseInstructionCommand) {}

  public handleCommand(parsedCommand: ParsedCommand): Robot | string | void {
    if (!this.robot) {
      return this.initializeRobot(parsedCommand);
    }

    switch (parsedCommand.command) {
      case Command.Left:
        return this.robot.turnLeft();
      case Command.Right:
        return this.robot.turnRight();
      case Command.Move:
        return this.robot.move();
      case Command.Report:
        return this.robot.report();
      default:
        return this.robot;
    }
  }

  private initializeRobot = (parsedCommand: ParsedCommand): Robot | void => {
    const { command, coordinates, direction } = parsedCommand;
    if (command === Command.Place && coordinates && direction !== undefined) {
      const initialPosition = {
        x: coordinates.x,
        y: coordinates.y,
        direction,
      };

      const logger = new ConsoleLogger();
      this.robot = new ToyRobot(
        new RobotMovementStore(
          logger,
          new TableSurface({ width: 5, height: 5 })
        ),
        initialPosition,
        logger
      );
    }
  };

  public execute = (rawCommand: string) => {
    const parsedCommmand = this.parseCommand.execute(rawCommand);

    this.handleCommand(parsedCommmand);

    this.robot?.report();

    return this.robot?.report();
  };
}

export default CommandRobot;
