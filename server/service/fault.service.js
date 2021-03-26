const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");

const fileName = 'fault.json';

const createFault = async (faultData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/deviceLogs'
  const data = {
    masterKey: MasterKey,
    faultData
  }
  const res = await http.getPostWithConfig(requestUrl, data);
  if (res && !res.code) {
    console.log("Fault created");
  } else {
    console.log("Fault create fail");
  }
};

const getFaultData = async () => {
  return await file.readJSONFile(fileName);
};

const saveFaultData = async (faultData = {}) => {
  if (faultData && faultData.list && faultData.list.length) {
    await createFault(faultData.list[0])
  } else {
    console.log("Fault not found");
  }

  faultData.updateAt = new Date();
  await file.writeJSONFile(fileName, faultData);
};

module.exports = {
  getFaultData,
  saveFaultData
}


