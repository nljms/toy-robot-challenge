import RobotMovementStore from '../../domain/store';
import ParseInstructionCommand from '../parseInstruction';

let parseCommand: ParseInstructionCommand;

describe('ParseInstructionCommand', () => {
  beforeEach(() => {
    parseCommand = new ParseInstructionCommand();
  });

  afterEach(() => {
    RobotMovementStore.movementLog = [];
  });

  describe('execute', () => {
    it('should parse the initial command', () => {
      const parsedCommand = parseCommand.execute('PLACE 1,2,NORTH');
      const expectedResult = {
        command: 'PLACE',
        position: {
          x: 1,
          y: 2,
          direction: 0,
        },
      };
      expect(parsedCommand).toStrictEqual(expectedResult);
    });

    it('should parse succeeding commands', () => {
      RobotMovementStore.movementLog = [{} as any];

      const parsedCommand = parseCommand.execute('MOVE');
      const expectedResult = {
        command: 'MOVE',
      };
      expect(parsedCommand).toStrictEqual(expectedResult);
    });
  });
});
