var path = require('path');

module.exports = {
  entry: './build/scripts/app.js',
  target: 'node',
  output: {
    filename: 'slackbotbundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};