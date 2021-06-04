const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const { actionTypes } = require('../middlewares/server');
const { cui } = require('../utils');
const { deviceService, deviceLogService, statisticsService,
  faultService, aboutService, configService, activityLogService, settingsService } = require('../service');


// Spinning the http server and the websocket server.
const server = http.createServer();

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];



const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(JSON.stringify(json));
  });
}

const controller = async (userID, requestPayload) => {
  const json = { type: requestPayload.type };
  switch (requestPayload.type) {
    case actionTypes.USER_EVENT:
      users[userID] = requestPayload;
      userActivity.push(`${requestPayload.username} joined to edit the document`);
      json.data = { users, userActivity };
      break;
    case actionTypes.CONTENT_CHANGE:
      editorContent = requestPayload.content;
      json.data = { editorContent, userActivity };
      break;
    case actionTypes.OVERVIEW:
      const config = await configService.getConfigData();
      const statistics = await statisticsService.getStatisticsData();
      const statisticsData = statistics && statistics.list && statistics.list.length > 0 && { ...statistics.list[0], ...statistics.list[1] } || {}
      const loggerFault = await faultService.getFaultData();
      const activityLog = await activityLogService.getActivityLogData();
      const deviceList = await deviceService.getDeviceData();
      json.data = {
        ...config,
        ...statisticsData,
        devicesCount: deviceList.count || 0,
        loggerFaultCount: (loggerFault && loggerFault.count) || 0,
        activityLogCount: (activityLog.list && activityLog.list.length) || 0}
      break;
    case actionTypes.CONFIG:
      json.data = await configService.getConfigData();
      break;
    case actionTypes.ACTIVITY_LOG:
      json.data = await activityLogService.getActivityLogData();
      break;
    case actionTypes.FAULT:
      json.data = await faultService.getFaultData();
      break;
    case actionTypes.DEVICE_LIST:
      json.data = await deviceService.getDeviceData();
      break;
    case actionTypes.DEVICE_INFO:
      json.data = await deviceLogService.getDeviceLogData();
      break;
    case actionTypes.STATISTICS:
      json.data = await statisticsService.getStatisticsData();
      break;
    case actionTypes.SETTINGS:
      let settingsData = await settingsService.getSettingsData();
      if (!settingsData.list) {
        const devicesData = await deviceService.getDeviceData();
        settingsData = {
          service: actionTypes.SETTINGS,
          list: devicesData.list && devicesData.list.map(device => ({
            deviceId: device.dev_id,
            deviceName: device.dev_name,
            stationName: '-',
            stringsCount: 0,
            firstDirection: [],
            secondDirection: [],
            powerPerPin: 0
          }))
        }
      }
      json.data = settingsData;
      break;
    case actionTypes.UPDATE_SETTINGS:
      const { list } = requestPayload.data || {};
      const updatedSettingsData = {
        service: actionTypes.SETTINGS,
        list
      }
      await settingsService.saveSettingsData(updatedSettingsData);
      json.data = {
        message: 'Settings updated'
      };
      break;
  }

  sendMessage(json);
}

const start = async () => {
  server.listen(webSocketsServerPort);
  const wsServer = new webSocketServer({
    httpServer: server
  });
  wsServer.on('request', function(request) {
    var userID = cui.getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
    connection.on('message', async (message) => {
      if (message.type === 'utf8') {
        try {
          const requestPayload = JSON.parse(message.utf8Data);
          await controller(userID, requestPayload);
        } catch (error) {
          console.log(error)
        }
      }
    });
    // user disconnected
    connection.on('close', function(connection) {
      console.log((new Date()) + " Peer " + userID + " disconnected.");
      delete clients[userID];
      delete users[userID];
    });
  });
}

module.exports = {
  start,
  sendMessage
}
