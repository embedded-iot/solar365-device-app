const { file, http } = require('../utils');
const globalConfig = require('../config/global');
const { actionTypes, alertTypes } = require('../middlewares/master');

const fileName = 'activityLog.json';

const getActivityLogData = async () => {
  return await file.readJSONFile(fileName);
};

const saveActivityLogData = async (activityLogData = {}) => {
  const res = await http.getAsyncWithConfig(globalConfig.SERVER_API);
  // console.log(res)
  await file.writeJSONFile(fileName, activityLogData);
};

const pushActivityLog = async ({ category = '', type = '', description = '', details = {} } = {}) => {
  if (!category) {
    console.log('the activity log must has category field.')
    return;
  }

  const activityLogData = await getActivityLogData();
  if (!activityLogData.list) {
    activityLogData.list = [];
  }
  activityLogData.service = actionTypes.ACTIVITY_LOG;
  activityLogData.list = [{
    category,
    description,
    updateAt: new Date()
  }, ...activityLogData.list]

  await saveActivityLogData(activityLogData);
}

const success = async ({ category = '', type = '', description = '', details = {} } = {}) => {
  await pushActivityLog({ category, description, details, type: alertTypes.SUCCESS })
}
const error = async ({ category = '', type = '', description = '', details = {} } = {}) => {
  await pushActivityLog({ category, description, details, type: alertTypes.ERROR })
}
const warning = async ({ category = '', type = '', description = '', details = {} } = {}) => {
  await pushActivityLog({ category, description, details, type: alertTypes.WARNING })
}

module.exports = {
  getActivityLogData,
  success,
  error,
  warning,
}


