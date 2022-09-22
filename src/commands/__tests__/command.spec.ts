import RobotMovementStore from '../../domain/store';
import CommandRobot from '../command';
import ParseInstructionCommand from '../parseInstruction';

describe('CommandRobot', () => {
  let commandRobot: CommandRobot;
  let parseCommand: ParseInstructionCommand;

  beforeEach(() => {
    parseCommand = new ParseInstructionCommand();
    commandRobot = new CommandRobot(parseCommand);
    RobotMovementStore.movementLog = [];
  });

  it('Should throw an error when invalid command is received', () => {
    expect(() => commandRobot.execute('TEST')).toThrow('Invalid input!');
  });

  it('Should handle input a:', () => {
    const expectedResult = {
      x: 0,
      y: 1,
      direction: 'NORTH',
    };

    commandRobot.execute('PLACE 0,0,NORTH');
    commandRobot.execute('MOVE');
    const result = commandRobot.execute('REPORT');

    expect(result?.position).toStrictEqual(expectedResult);
  });

  it('Should handle input b:', () => {
    const expectedResult = {
      x: 0,
      y: 0,
      direction: 'WEST',
    };

    commandRobot.execute('PLACE 0,0,NORTH');
    commandRobot.execute('LEFT');
    const result = commandRobot.execute('REPORT');

    expect(result?.position).toStrictEqual(expectedResult);
  });

  it('Should handle input c:', () => {
    const expectedResult = {
      x: 3,
      y: 3,
      direction: 'NORTH',
    };
    commandRobot.execute('PLACE 1,2,EAST');
    commandRobot.execute('MOVE');
    commandRobot.execute('MOVE');
    commandRobot.execute('LEFT');
    commandRobot.execute('MOVE');
    const result = commandRobot.execute('REPORT');

    expect(result?.command).toBe('MOVE');
    expect(result?.position).toStrictEqual(expectedResult);
  });

  it('Should throw out of bounds for handling initial command', () => {
    expect(() => commandRobot.execute('PLACE 6,3,EAST')).toThrow();
  });

  it('Should throw out of bounds for handling invalid succeeding commands', () => {
    commandRobot.execute('PLACE 5,5,NORTH');
    expect(() => commandRobot.execute('MOVE')).toThrow();
  });
});
