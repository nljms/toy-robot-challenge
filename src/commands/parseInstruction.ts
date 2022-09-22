import { ParsedCommand, Parser } from '../types';

class ParseInstructionCommand {
  constructor(private readonly parser: Parser) {}

  public execute = (rawCommand: string): ParsedCommand => {
    return this.parser.parse(rawCommand);
  };
}

export default ParseInstructionCommand;
