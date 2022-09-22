import { Interface } from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import CommandRobot from '../commands/command';
import ReadFileCommand from '../commands/readFile';
import { InvalidCommandException } from '../errors';
import { CommandLine } from '../types';

class Cli extends Interface implements CommandLine {
  constructor(
    private readonly readfileCommand: ReadFileCommand,
    private readonly moveRobotCommand: CommandRobot
  ) {
    super({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });
  }

  public chooseInput = async () => {
    const _args = await yargs(hideBin(process.argv))
      .option('-i', {
        alias: 'input',
      })
      .option('d', {
        alias: 'directory',
      });

    const args = await _args.argv;

    if (!args.i && !args.d) {
      throw new InvalidCommandException();
    }

    if (args.d) {
      return this.readfileCommand.execute(args.d as string);
    }

    return this.run();
  };

  public run = (): void => {
    this.on('line', this.moveRobotCommand.execute);
  };
}

export default Cli;
