const { file } = require('../../utils');

const fileName = 'debugLog.json';

const pushDebugLog = async (str = '') => {
  const date = new Date();
  await file.writeTextFile(fileName, `[${date.toString()}]: ${str}`);
};

module.exports = {
  pushDebugLog
}


