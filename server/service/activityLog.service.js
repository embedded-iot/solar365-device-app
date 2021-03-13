const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const { actionTypes } = require('../middlewares/master');

const fileName = 'activityLog.json';

const getActivityLogData = async () => {
  return await file.readJSONFile(fileName);
};

const saveActivityLogData = async (deviceData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  deviceData.updateAt = new Date();
  await file.writeJSONFile(fileName, deviceData);
};

const pushActivityLog = async (activityLog = {}) => {
  if (!activityLog.type || !activityLog.event) {
    console.log('the activity log must has type and event field.')
    return;
  }

  const activityLogData = await getActivityLogData();
  if (!activityLogData.list) {
    activityLogData.list = [];
  }
  activityLog.service = actionTypes.ACTIVITY_LOG;
  activityLogData.list = [...activityLogData.list, {
    ...activityLog,
    updateAt: new Date()
  }]

  await saveActivityLogData()
}

module.exports = {
  getActivityLogData,
  pushActivityLog
}


