import ParseInstructionCommand from './parseInstruction';
import { Command, ParsedCommand } from '../types';
import { ConsoleLogger } from '../utils';
import ToyRobot from '../domain/robot';
import RobotMovementStore from '../domain/store';
import { InvalidCommandException } from '../errors';

class CommandRobot {
  private robot: ToyRobot | undefined;

  constructor(private readonly parseCommand: ParseInstructionCommand) {}

  public handleCommand(parsedCommand: ParsedCommand): void {
    if (this.robot) {
      switch (parsedCommand.command) {
        case Command.Left:
          this.robot.turnLeft();
          break;
        case Command.Right:
          this.robot.turnRight();
          break;
        case Command.Move:
          this.robot.move();
          break;
        case Command.Report:
          this.robot.report();
          break;
        default:
      }
    }

    if (parsedCommand.command === Command.Place && parsedCommand.position) {
      this.robot = new ToyRobot(
        new RobotMovementStore(new ConsoleLogger()),
        parsedCommand.position
      );
    }
  }

  public execute = (rawCommand: string) => {
    const parsedCommmand = this.parseCommand.execute(rawCommand);
    if (!parsedCommmand) {
      throw new InvalidCommandException();
    }
    this.handleCommand(parsedCommmand);

    if (!(rawCommand === Command.Report)) {
      return;
    }
    return RobotMovementStore.fetchLatestLog();
  };
}

export default CommandRobot;
