const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const { actionTypes } = require('../middlewares/server');
const { cui } = require('../utils');
const { deviceService, deviceLogService, statisticsService,
  faultService, aboutService, configService, activityLogService } = require('../service');


// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

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
    clients[client].sendUTF(json);
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
    case actionTypes.CONFIG:
      const config = await configService.getConfigData();
      json.data = { config };
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

  }

  sendMessage(JSON.stringify(json));
}

const start = async () => {
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
  start
}
