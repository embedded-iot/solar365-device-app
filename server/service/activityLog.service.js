const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const { actionTypes, alertTypes } = require('../middlewares/master');
const configService = require("./config.service");

const fileName = 'activityLog.json';

const createActivityLog = async (activityLogData = {}) => {
  const { MasterKey } = await configService.getConfigData();
  const requestUrl = globalConfig.SERVER_API + '/activityLogs'
  const data = {
    masterKey: MasterKey,
    ...activityLogData
  }
  const res = await http.getPostWithConfig(requestUrl, data);
  if (res && !res.code) {
    console.log("ActivityLog created");
  } else {
    console.log("ActivityLog create fail");
  }
};

const getActivityLogData = async () => {
  return await file.readJSONFile(fileName);
};

const saveActivityLogData = async (activityLogData = {}) => {
  await file.writeJSONFile(fileName, activityLogData);
};

const pushActivityLog = async ({ category = '', type = '', description = '', activityLogData = {} } = {}) => {
  if (!category) {
    console.log('the activity log must has category field.')
    return;
  }

  const activityLog = {
    category,
    type,
    description,
    activityLogData,
  }

  await createActivityLog(activityLog);

  const activityLogLocalData = await getActivityLogData();
  if (!activityLogLocalData.list) {
    activityLogLocalData.list = [];
  }
  activityLogLocalData.service = actionTypes.ACTIVITY_LOG;
  activityLogLocalData.list = [{
    ...activityLog,
    updateAt: new Date()
  }, ...activityLogLocalData.list]

  await saveActivityLogData(activityLogLocalData);
}

const success = async ({ category = '', type = '', description = '', activityLogData = {} } = {}) => {
  await pushActivityLog({ category, description, activityLogData, type: alertTypes.SUCCESS })
}
const error = async ({ category = '', type = '', description = '', activityLogData = {} } = {}) => {
  await pushActivityLog({ category, description, activityLogData, type: alertTypes.ERROR })
}

const clearData = async (beforeDatetime) => {
 const activityLogData = await getActivityLogData();
 activityLogData.list = activityLogData.list.filter(activityLog => (new Date(activityLog.updateAt)) < beforeDatetime);
 await saveActivityLogData(activityLogData);
}

module.exports = {
  getActivityLogData,
  saveActivityLogData,
  success,
  error,
  clearData,
}


