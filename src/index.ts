#!/usr/bin/env node
import ReadFileCommand from './commands/ReadFile';
import { ConsoleLogger } from './utils';
import Cli from './utils/cli';

new Cli(new ConsoleLogger(), new ReadFileCommand()).chooseInput();
