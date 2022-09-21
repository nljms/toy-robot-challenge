#!/usr/bin/env node
import CommandRobot from './commands/command';
import ParseInstructionCommand from './commands/parseInstruction';
import ReadFileCommand from './commands/readFile';
import Cli from './utils/cli';

const commandRobot = new CommandRobot(new ParseInstructionCommand());

new Cli(new ReadFileCommand(commandRobot), commandRobot).chooseInput();
