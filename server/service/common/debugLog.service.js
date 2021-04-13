const { file } = require('../../utils');
var os = require("os");

const fileName = 'debugLog.txt';

const pushDebugLog = async (str = '') => {
  const date = new Date();
  await file.writeTextFile(fileName, `[${date.toString()}]: ${str}` + + os.EOL);
};

module.exports = {
  pushDebugLog
}


