import fs from 'fs';
import { RobotMovementStore } from '../domain';
import CommandRobot from './command';

class ReadFileCommand {
  constructor(private readonly commandRobot: CommandRobot) {}

  private parseFile = (data: string): string[] => {
    return data.split('\n');
  };

  private processCommands = (rawCommands: string[]) => {
    rawCommands.forEach(this.commandRobot.execute);
  };

  /**
   * Read file directory and parse into readable
   * robotic instructions
   *
   * and process the commands
   * @param directory
   */
  public execute = async (directory: string) => {
    const file = await fs.readFileSync(directory);

    const rawCommands = this.parseFile(Buffer.from(file).toString('utf-8'));

    const filteredCommands = rawCommands
      .map((command) => command.trim())
      .filter(Boolean);

    console.log(filteredCommands);
    this.processCommands(filteredCommands);

    return RobotMovementStore.fetchLatestLog();
  };
}

export default ReadFileCommand;
