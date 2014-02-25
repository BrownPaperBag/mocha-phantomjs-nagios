// perform tests that live in the given folder
var argv = require('minimist')(process.argv.slice(2));

function usage() {
  console.log('Usage: node run-tests --test-directory <location-of-your-tests>');
}

var testDirectory = argv['test-directory'];
if (!testDirectory) {
  return usage();
}

var Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path');

var mocha = new Mocha({
    ui: 'bdd',
    reporter: 'list'
});

fs.readdirSync(testDirectory).filter(function(file) {
  return file.substr(-3) === '.js';
}).forEach(function(file) {
  mocha.addFile(path.join(testDirectory, file));
});

phantomPage = require('./lib/phantom-page');

// hijack write to prevent text being output before the nagios header
var write = process.stdout.write;
var output = '';
process.stdout.write = function(content) {
  output += content;
};
mocha.run(function(failures) {
  process.stdout.write = write;
  if (failures) {
    console.log('TESTS CRITICAL');
  } else {
    console.log('TESTS OK');
  }

  console.log(output);

  process.exit(failures ? 2 : 0);
});
