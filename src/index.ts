#!/usr/bin/env node
import CommandRobot from './commands/command';
import ParseInstructionCommand from './commands/parseInstruction';
import ReadFileCommand from './commands/readFile';
import Cli from './utils/cli';
import InputParser from './utils/parser';

const parser = new InputParser();

const commandRobot = new CommandRobot(new ParseInstructionCommand(parser));

new Cli(new ReadFileCommand(commandRobot), commandRobot).chooseInput();
