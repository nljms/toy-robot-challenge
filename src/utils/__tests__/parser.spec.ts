import { Direction } from '../../types';
import InputParser from '../parser';

let inputParser: InputParser;

describe('InputParser', () => {
  beforeEach(() => {
    inputParser = new InputParser();
  });

  describe('getCommand', () => {
    it('Gets a valid command from an input', () => {
      const expectedResult = ['PLACE', 'LEFT', 'RIGHT', 'MOVE', 'REPORT'];
      const expectation = [
        inputParser.getCommand('PLACE 1,1,NORTH'),
        inputParser.getCommand('LEFT'),
        inputParser.getCommand('RIGHT'),
        inputParser.getCommand('MOVE 1'),
        inputParser.getCommand('REPORT'),
      ];

      expect(expectation).toStrictEqual(expectedResult);
    });
  });

  describe('getCoordinate', () => {
    it('Gets a valid coordinates', () => {
      const expectedResult = { x: 1, y: 1 };
      const expectation = inputParser.getCoordinates('PLACE 1,1,NORTH');

      expect(expectation).toStrictEqual(expectedResult);
    });
  });

  describe('getDirection', () => {
    it('Gets a valid direction', () => {
      const expectedResult = [
        Direction.NORTH,
        Direction.SOUTH,
        Direction.EAST,
        Direction.WEST,
      ];
      const expectation = [
        inputParser.getDirection('PLACE 1,1,NORTH'),
        inputParser.getDirection('PLACE 1,1,SOUTH'),
        inputParser.getDirection('PLACE 1,1,EAST'),
        inputParser.getDirection('PLACE 1,1,WEST'),
      ];

      expect(expectation).toStrictEqual(expectedResult);
    });
  });

  describe('getUser', () => {
    it('Gets a valid direction', () => {
      const expectedResult = { id: 1 };
      const expectation = inputParser.getUser('MOVE 1');

      expect(expectation).toStrictEqual(expectedResult);
    });
  });

  describe('parse', () => {
    it('Parses a valid PLACE command', () => {
      const expectedResult = {
        command: 'PLACE',
        coordinates: { x: 1, y: 1 },
        direction: Direction.NORTH,
      };
      const expectation = inputParser.parse('PLACE 1,1,NORTH');

      expect(expectation).toStrictEqual(expectedResult);
    });

    it('Parses a valid LEFT command', () => {
      const expectedResult = {
        command: 'LEFT',
      };
      const expectation = inputParser.parse('LEFT');

      expect(expectation).toStrictEqual(expectedResult);
    });

    it('Parses a valid RIGHT command', () => {
      const expectedResult = {
        command: 'RIGHT',
      };
      const expectation = inputParser.parse('RIGHT');

      expect(expectation).toStrictEqual(expectedResult);
    });

    it('Parses a valid MOVE command', () => {
      const expectedResult = {
        command: 'MOVE',
        user: { id: 1 },
      };
      const expectation = inputParser.parse('MOVE 1');

      expect(expectation).toStrictEqual(expectedResult);
    });

    it('Throws an error when provided an invalid command', () => {
      expect(() => inputParser.parse('TEST')).toThrow('Invalid input!');
    });
  });
});
