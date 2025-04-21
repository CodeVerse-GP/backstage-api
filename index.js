#!/usr/bin/env node

const { version, name, author } = require('./package.json');
const { Command } = require('commander');
const facet = require('./commands/facet');
const orphan = require('./commands/orphan');

const program = new Command();

program
  .name('backstage-api')
  .version(`${name} v${version}\nAuthor: ${author}`)
  .description('Work seamlessly with Backstage from the command line.');

program.addCommand(facet);
program.addCommand(orphan);

program.parse(process.argv);
