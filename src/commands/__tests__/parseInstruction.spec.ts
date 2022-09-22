import InputParser from '../../utils/parser';
import ParseInstructionCommand from '../parseInstruction';

let parseMethodMock = jest.fn();

let parseCommand: ParseInstructionCommand;

describe('ParseInstructionCommand', () => {
  beforeAll(() => {
    jest
      .spyOn(InputParser.prototype, 'parse')
      .mockImplementation(parseMethodMock);
    jest
      .spyOn(ParseInstructionCommand.prototype, 'execute')
      .mockImplementation(jest.fn());
  });

  beforeEach(() => {
    parseCommand = new ParseInstructionCommand(new InputParser());
  });

  describe('execute', () => {
    it('Should call parse method', () => {
      parseCommand.execute('PLACE 1,1,NORTH');
      parseCommand.execute('MOVE');
      expect(parseMethodMock).toHaveBeenCalledTimes(2);
    });
  });
});
