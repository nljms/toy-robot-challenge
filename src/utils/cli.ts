import { Interface } from 'readline';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import ReadFileCommand from '../commands/ReadFile';
import { InvalidCommandException } from '../errors';
import { CliArgs } from '../types';
import { ConsoleLogger } from './logger';

class Cli extends Interface {
  constructor(
    private readonly logger: ConsoleLogger,
    private readonly readfileCommand: ReadFileCommand
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
    this.on('line', this.logger.info);
  };
}

export default Cli;
