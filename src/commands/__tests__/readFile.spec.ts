import path from 'path';
import RobotMovementStore from '../../domain/store';
import CommandRobot from '../command';
import ParseInstructionCommand from '../parseInstruction';
import ReadFileCommand from '../readFile';

describe('ReadFileCommand', () => {
  let commandRobot: CommandRobot;
  let readFileCommand: ReadFileCommand;
  let parseCommand: ParseInstructionCommand;

  beforeEach(() => {
    parseCommand = new ParseInstructionCommand();
    commandRobot = new CommandRobot(parseCommand);
    readFileCommand = new ReadFileCommand(commandRobot);
    RobotMovementStore.movementLog = [];
  });

  describe('execute', () => {
    it('Should read a file', async () => {
      const dirname = path.join(__dirname, '../../../commands.txt');

      const expectedResult = {
        x: 3,
        y: 3,
        direction: 'NORTH',
      };

      const result = await readFileCommand.execute(dirname);

      expect(result.position).toStrictEqual(expectedResult);
    });
  });
});
