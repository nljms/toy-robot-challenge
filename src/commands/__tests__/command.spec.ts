import CommandRobot from '../command';
import ParseInstructionCommand from '../parseInstruction';

describe('CommandRobot', () => {
  let commandRobot: CommandRobot;
  let parseCommand: ParseInstructionCommand;

  beforeAll(() => {
    parseCommand = new ParseInstructionCommand();
    commandRobot = new CommandRobot(parseCommand);
  });
  it('Should execute the appropriate commands', () => {
    commandRobot.execute('PLACE 1,2,EAST');
    commandRobot.execute('MOVE');
    commandRobot.execute('MOVE');
    commandRobot.execute('LEFT');
    commandRobot.execute('MOVE');
    commandRobot.execute('REPORT');

    expect({}).toBeCalledWith({});
  });
});
