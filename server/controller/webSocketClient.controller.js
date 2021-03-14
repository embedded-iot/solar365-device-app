const WebSocketClient = require('websocket').client;
const { cui } = require('../utils');
const { connectPayload, actionTypes, deviceListPayload, deviceLogPayload, statisticsPayload,
  faultPayload, activityLogCategories  } = require('../middlewares/master');
const { deviceService, deviceLogService, statisticsService,
  faultService, aboutService, configService, activityLogService } = require('../service');

const i18n = require('../config/i18n');

let clientConnection = null;


const request = (payload= {}) => {
  if (!clientConnection.connected) return ;
  clientConnection.sendUTF(JSON.stringify(payload));
  return new Promise(((resolve, reject) => {
    clientConnection.on('message', async function(message) {
      if (message.type === 'utf8') {
        try {
          const response = JSON.parse(message.utf8Data);
          resolve(response);
        } catch (error) {
          reject({ error })
        }
      }
    });
  }))
}

const controller = async (response) => {
  const CONFIG_DATA = await configService.getConfigData();
  if (response && response.result_code === 1 && response.result_data) {
    switch (response.result_data.service) {
      case actionTypes.CONNECT:
        CONFIG_DATA.token = response.result_data.token;
        CONFIG_DATA.isConnected = true;
        await configService.saveConfigData(CONFIG_DATA);
        break;
      case actionTypes.STATISTICS:
        await statisticsService.saveStatisticsData(response.result_data);
        break;
      case actionTypes.DEVICE_LIST:
        await deviceService.saveDeviceData(response.result_data);
        break;
      case actionTypes.DEVICE_LOG:
        const deviceLogData = await deviceLogService.getDeviceLogData();
        deviceLogData.list = deviceLogData.list ? [...deviceLogData.list] : []
        deviceLogData.list.push(response.result_data);
        await deviceLogService.saveDeviceLogData(deviceLogData);
        break;
      case actionTypes.FAULT:
        await faultService.saveFaultData(response.result_data);
        break;
      case actionTypes.ABOUT:
        if (response.result_data.product_name) {
          CONFIG_DATA.productName = response.result_data.product_name;
        } else if (response.result_data.list) {
          CONFIG_DATA.DeviceSN = response.result_data.list && response.result_data.list[0].data_value || '-';
          CONFIG_DATA.MasterKey = CONFIG_DATA.DeviceSN;
        }

        await configService.saveConfigData(CONFIG_DATA);
        const aboutData = await aboutService.getAboutData();
        await aboutService.saveAboutData({
          ...aboutData,
          ...response.result_data
        });
        break;
    }
  }
};

const getDeviceLog = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  const token = CONFIG_DATA.token;
  const deviceData = await deviceService.getDeviceData();
  await deviceLogService.saveDeviceLogData({});
  if (deviceData.list && deviceData.list.length) {
    for (let i = 0; i < deviceData.list.length; i++) {
      const device = deviceData.list[i];
      const response = await request(deviceLogPayload({ token, dev_id: device.dev_id }));
      response.result_data.deviceId = device.dev_id;
      await controller(response);
    }
  }
}

const onConnect = async (requestUrl) => {
  const client = new WebSocketClient();
  client.connect(requestUrl, 'echo-protocol')
  return new Promise((resolve, reject) => {
    client.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
      resolve(false);
    });
    client.on('connect', async function(connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
        resolve(false);
      });
      connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        resolve(false);
      });

      clientConnection = connection;

      const loginResponse = await request(connectPayload({ token: cui.getUniqueID() }));
      await controller(loginResponse);

      const CONFIG_DATA = await configService.getConfigData();
      const token = CONFIG_DATA.token;
      if (token) {
        const productResponse = await aboutService.requestProduct();
        await controller(productResponse);
        const aboutResponse = await aboutService.requestAbout( { token, lang: 'en_us' });
        await controller(aboutResponse);
        const statisticsResponse = await request(statisticsPayload({ token }));
        await controller(statisticsResponse);
        const deviceResponse = await request(deviceListPayload({ token }));
        await controller(deviceResponse);
        await getDeviceLog();
        await deviceLogService.getDeviceLogData();
        const faultResponse = await request(faultPayload({ token }));
        await controller(faultResponse);
      }
      resolve(true)
    });
  })
}

const connect = async () => {
  console.log('Master connect....')
  const CONFIG_DATA = await configService.getConfigData();
  CONFIG_DATA.isConnected = false;
  await configService.saveConfigData(CONFIG_DATA);
  const requestUrl = `ws://${CONFIG_DATA.MASTER_IP}/ws/home/overview`;
  const isConnected = await onConnect(requestUrl);
  if (!isConnected) {
    await activityLogService.error({
      category: activityLogCategories.MASTERS,
      description: i18n.MASTERS_NOT_FOUND + ': ' + CONFIG_DATA.MASTER_IP
    })
  } else {
    await activityLogService.success({
      category: activityLogCategories.MASTERS,
      description: i18n.MASTERS_UPLOADED_SUCCESS
    })
  }
  return isConnected;
}

module.exports = {
  connect
}
