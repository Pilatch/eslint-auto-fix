#!/usr/bin/env node

let argv = require('yargs')
  .usage('$0 <globs-to-watch> [options]')
  // TODO put in positional arg
  // with a reminder to quote the globs unless you want the shell to expand them!
  .option('verbose', {
    default: false,
    describe: 'Whether to say when a file is being fixed',
    type: 'boolean',
  })
  .option('fix-on-startup', {
    default: false,
    describe: 'Whether to fix all the matching files immediately',
    type: 'boolean',
  })
  .help()
  .argv

require('./fix')(argv._, argv)
