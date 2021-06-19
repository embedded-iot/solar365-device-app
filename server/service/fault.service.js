const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const configService = require("./config.service");
const { actionTypes, alertTypes, faultCategories, faultEvents } = require('../middlewares/master');

const faultMapper = require('./fault/faultMapper')
const i18n = require('./fault/i18n')

const fileName = 'fault.json';

const createFault = async (faultData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/faults'
  const data = {
    masterKey: MasterKey,
    ...faultData
  }
  const res = await http.postWithConfig(requestUrl, data);
  if (res && !res.code) {
    console.log("Fault created");
  } else {
    console.log("Fault create fail");
  }
};

const getFaultData = async () => {
  return await file.readJSONFile(fileName);
};

const saveFaultLocalData = async (faultData = {}) => {
  await file.writeJSONFile(fileName, faultData);
};

const pushFault = async (
  {
    category = '',
    type = '',
    event = '',
    position = 0,
    description = '',
    reason = '',
    suggest = '',
    faultData = {}
  } = {}) => {
  if (!category) {
    console.log('the faul must has category field.')
    return;
  }

  const activityLog = {
    category,
    type,
    event,
    position,
    description,
    reason,
    suggest,
    faultData,
  }

  await createFault(activityLog);

  const faultLocalData = await getFaultData();
  if (!faultLocalData.list) {
    faultLocalData.list = [];
  }
  faultLocalData.service = actionTypes.FAULT;
  faultLocalData.list = [{
    ...activityLog,
    updateAt: new Date()
  }, ...faultLocalData.list]

  await saveFaultLocalData(faultLocalData);
}

const saveFaultData = async (faultList = []) => {
  if (faultList.length) {
    for (let i = 0; i < faultList.length; i++) {
      const faultData = faultList[i];
      const faultI18n = faultMapper.find(
        (mapper) => mapper.fault_code === faultData.fault_code
      );
      const faultPayload = {
        category: faultCategories.LOGGER_FAULT,
        type: faultData.fault_level === '' ? alertTypes.ERROR: alertTypes.WARNING,
        event: faultEvents.DEVICES,
        position: faultData.dev_id,
        description: fault_I18n[faultI18n.fault_name_i18nKey] || '',
        reason: fault_I18n[faultI18n.fault_reason_i18nKey] || '',
        suggest: fault_I18n[faultI18n.fault_suggest_i18nKey] || '',
        faultData
      }
      await pushFault(faultPayload)
    }
  } else {
    console.log("Fault not found");
  }
};

const error = async (
  {
    category = '',
    event = '',
    position = 0,
    description = '',
    reason = '',
    suggest = '',
    faultData = {}
  } = {}) => {
  await pushFault({ category, type: alertTypes.ERROR, event, position, description, reason, suggest, faultData })
}

const warning = async (
  {
    category = '',
    event = '',
    position = 0,
    description = '',
    reason = '',
    suggest = '',
    faultData = {}
  } = {}) => {
  await pushFault({ category, type: alertTypes.WARNING, event, position, description, reason, suggest, faultData })
}

const clearData = async (beforeDatetime) => {
  const faultData = await getFaultData();
  faultData.list = faultData.list.filter(activityLog => (new Date(activityLog.updateAt)) < beforeDatetime);
  await saveFaultData(faultData);
}

module.exports = {
  getFaultData,
  saveFaultData,
  error,
  warning,
  clearData,
}


