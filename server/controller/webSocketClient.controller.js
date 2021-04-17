const WebSocketClient = require('websocket').client;
const { cui } = require('../utils');
const { connectPayload, actionTypes, deviceListPayload, deviceLogPayload, deviceLogIOPayload, statisticsPayload,
  faultPayload, statisticDeviceDetailsPayload, deviceInfoPayload, activityLogCategories  } = require('../middlewares/master');
const { deviceService, deviceLogService, statisticsService,
  faultService, aboutService, configService, activityLogService } = require('../service');
const { pushDebugLog } = require('../service/common/debugLog.service');
const { delay } = require("../utils");

const i18n = require('../config/i18n');

let clientConnection = null;

const request = (payload= {}) => {
  if (!clientConnection.connected) {
    console.log("Send fail: the client is not connected")
    return ;
  }
  clientConnection.sendUTF(JSON.stringify(payload));
  if (payload.service === actionTypes.CONNECT) {
    console.log(JSON.stringify(payload))
  }
  process.logObj.clientSendCount++;

  return new Promise(((resolve, reject) => {
    let timeout = setTimeout(() => {
      console.log("-----Timeout Response");
      resolve(null);
    }, 3000);
    clientConnection.on('message', async function(message) {
      if (message.type === 'utf8') {
        try {
          // console.log(message.utf8Data)
          const response = JSON.parse(message.utf8Data);
          process.logObj.clientReceiveCount++;
          resolve(response);
        } catch (error) {
          console.log('error', error)
          resolve(null);
        } finally {
          clearTimeout(timeout);
        }
      } else {
        console.log('Invalid message.type')
        resolve(null);
      }
    });
  }))
}

const controller = async (response) => {
  const CONFIG_DATA = await configService.getConfigData();
  const token = CONFIG_DATA.token;
  if (response && response.result_code === 1 && response.result_data) {
    switch (response.result_data.service) {
      case actionTypes.CONNECT:
        CONFIG_DATA.token = response.result_data.token;
        CONFIG_DATA.isConnected = true;
        await configService.saveConfigData(CONFIG_DATA);
        break;
      case actionTypes.STATISTICS:
        const statisticDeviceDetailsResponse = await request(statisticDeviceDetailsPayload({ token }));
        response.result_data.list.push(statisticDeviceDetailsResponse.result_data);
        await statisticsService.saveStatisticsData(response.result_data);
        break;
      case actionTypes.DEVICE_LIST:
        await getDeviceInfo(response.result_data.list);
        await deviceService.saveDeviceData(response.result_data);
        break;
      case actionTypes.DEVICE_LOG:
        const deviceLogData = await deviceLogService.getDeviceLogData();
        deviceLogData.list = deviceLogData.list ? [...deviceLogData.list] : []
        deviceLogData.list.push(response.result_data);
        await deviceLogService.saveDeviceLogData(deviceLogData);
        break;
      case actionTypes.DEVICE_LOG_IO:
        const deviceLogIOData = await deviceLogService.getDeviceLogData();
        deviceLogIOData.listIO = deviceLogIOData.listIO ? [...deviceLogIOData.listIO] : []
        deviceLogIOData.listIO.push(response.result_data);
        await deviceLogService.saveDeviceLogData(deviceLogIOData);
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
      default:
        console.log("[Data parse fail]");
        await pushDebugLog("Data parse fail");
        await pushDebugLog(JSON.stringify(response));
    }
  } else if (response) {
    console.log("[Invalid Response]", JSON.stringify(response));
    await pushDebugLog("Invalid Response" + JSON.stringify(response));
  }
};

const getDeviceInfo = async (deviceList) => {
  const CONFIG_DATA = await configService.getConfigData();
  const token = CONFIG_DATA.token;
  if (deviceList && deviceList.length) {
    for (let i = 0; i < deviceList.length; i++) {
      const device = deviceList[i];
      const deviceInfoResponse = await deviceService.requestDeviceInfo(deviceInfoPayload({ token, dev_id: device.dev_id }));
      device.deviceInfo = deviceInfoResponse && deviceInfoResponse.result_data || null;
    }
  }
}

const getDeviceLog = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  const token = CONFIG_DATA.token;
  const deviceData = await deviceService.getDeviceData();
  await deviceLogService.saveDeviceLogData({});
  console.log(deviceData.list.length);
  if (deviceData.list && deviceData.list.length) {
    for (let i = 0; i < deviceData.list.length; i++) {
      const device = deviceData.list[i];
      const response = await request(deviceLogPayload({ token, dev_id: device.dev_id }));
      response.result_data.deviceId = device.dev_id;
      // console.log(response)
      await controller(response);
      const responseIO = await request(deviceLogIOPayload({ token, dev_id: device.dev_id }));
      responseIO.result_data.deviceId = device.dev_id;
      // console.log(responseIO)
      await controller(responseIO);
      const deviceLogData = await deviceLogService.getDeviceLogData();
      await deviceLogService.createDeviceLogData(deviceLogData);
      // await delay(1000);

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
      resolve(true)
    });
  })
}

const getData = async () => {
  let loginResponse = null;
  let countConnect = 3;
  while (!loginResponse && countConnect > 0) {
    countConnect = countConnect - 1;
    loginResponse = await request(connectPayload({ token: cui.getUniqueID() }));
    await delay(1000);
  }
  console.log("loginResponse", JSON.stringify(loginResponse));
  if (!loginResponse) {
    console.log('Connect Timeout');
    return;
  }
  await controller(loginResponse);

  const CONFIG_DATA = await configService.getConfigData();
  const token = CONFIG_DATA.token;
  if (token) {
    const productResponse = await aboutService.requestProduct();
    await controller(productResponse);
    const aboutResponse = await aboutService.requestAbout( { token, lang: 'en_us' });
    await controller(aboutResponse);
    const statisticsResponse = await request(statisticsPayload({ token }));
    // console.log(statisticsResponse)
    await controller(statisticsResponse);
    const deviceResponse = await request(deviceListPayload({ token }));
    // console.log(deviceResponse)
    await controller(deviceResponse);
    await getDeviceLog();
    await deviceLogService.getDeviceLogData();
    const faultResponse = await request(faultPayload({ token }));
    // console.log(faultResponse)
    await controller(faultResponse);
  }
}

const connect = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  console.log('Master connect....', CONFIG_DATA.MASTER_IP);
  CONFIG_DATA.isConnected = false;
  await configService.saveConfigData(CONFIG_DATA);
  const requestUrl = `ws://${CONFIG_DATA.MASTER_IP}/ws/home/overview`;
  process.logObj.connectTotalCount++;

  let isConnected = false;

  if (!clientConnection || !clientConnection.connected) {
    try {
      isConnected = await onConnect(requestUrl);
    } catch (error) {
      console.log("onConnect: ", error);
    }
  } else {
    isConnected = true;
  }

  if (!isConnected) {
    process.logObj.connectFailCount++;
    await activityLogService.error({
      category: activityLogCategories.MASTERS,
      description: i18n.MASTERS_NOT_FOUND + ': ' + CONFIG_DATA.MASTER_IP
    })
  } else {
    await getData();
    process.logObj.connectSuccessCount++;
    await activityLogService.success({
      category: activityLogCategories.MASTERS,
      description: i18n.MASTERS_UPLOADED_SUCCESS
    })
  }
  console.log("LOG: ", JSON.stringify(process.logObj));
  await pushDebugLog(JSON.stringify(process.logObj));
  return isConnected;
}

module.exports = {
  connect
}
