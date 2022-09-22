import InputParser from '../../utils/parser';
import RobotMovementStore from '../../utils/store';
import CommandRobot from '../command';
import ParseInstructionCommand from '../parseInstruction';

describe('CommandRobot', () => {
  let commandRobot: CommandRobot;
  let parseCommand: ParseInstructionCommand;
  let parser: InputParser;

  beforeEach(() => {
    parser = new InputParser();
    parseCommand = new ParseInstructionCommand(parser);
    commandRobot = new CommandRobot(parseCommand);
    RobotMovementStore.movementLog = [];
  });

  it('Should throw an error when invalid command is received', () => {
    expect(() => commandRobot.execute('TEST')).toThrow('Invalid input!');
  });

  it('Should handle input a:', () => {
    const expectedResult = '0,1,NORTH';

    commandRobot.execute('PLACE 0,0,NORTH');
    commandRobot.execute('MOVE');
    const result = commandRobot.execute('REPORT');

    expect(result).toBe(expectedResult);
  });

  it('Should handle input b:', () => {
    const expectedResult = '0,0,WEST';

    commandRobot.execute('PLACE 0,0,NORTH');
    commandRobot.execute('LEFT');
    const result = commandRobot.execute('REPORT');

    expect(result).toBe(expectedResult);
  });

  it('Should handle input c:', () => {
    const expectedResult = '3,3,NORTH';
    commandRobot.execute('PLACE 1,2,EAST');
    commandRobot.execute('MOVE');
    commandRobot.execute('MOVE');
    commandRobot.execute('LEFT');
    commandRobot.execute('MOVE');
    const result = commandRobot.execute('REPORT');

    expect(result).toBe(expectedResult);
  });

  it('Should throw out of bounds for handling initial command', () => {
    expect(() => commandRobot.execute('PLACE 6,3,EAST')).toThrow();
  });

  it('Should throw out of bounds for handling invalid succeeding commands', () => {
    commandRobot.execute('PLACE 5,5,NORTH');
    expect(() => commandRobot.execute('MOVE')).toThrow();
  });
});
