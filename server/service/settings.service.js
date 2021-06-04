const { file } = require('../utils');

const fileName = 'settings.json';

const getSettingsData = async () => {
  return await file.readJSONFile(fileName);
};

const saveSettingsData = async (deviceData = {}) => {
  await file.writeJSONFile(fileName, deviceData);
};

module.exports = {
  getSettingsData,
  saveSettingsData,
}


