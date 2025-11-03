#!/usr/bin/env node
// const { Command } = require('commander');
import {Command} from 'commander';
const program = new Command();

program
  .name('Socrate')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');


program.command('ifnti')
  .argument('<string>', "niveau d'étude (L1, L2 , L3)")
  .action((str,option) =>{
    console.log(str);
    console.log('Bonnjour '+str);
  });

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();