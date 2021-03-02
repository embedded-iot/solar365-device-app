const WebSocketClient = require('websocket').client;
const { cui } = require('../utils');
const { connectPayload, actionTypes, deviceListPayload } = require('../middlewares/master');

const client = new WebSocketClient();
let token = '';



client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
  console.log('WebSocket Client Connected');
  connection.on('error', function(error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on('close', function() {
    console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log("Received: '" + message.utf8Data + "'");
      try {
        const response = JSON.parse(message.utf8Data);
        if (response && response.result_code === 1 && response.result_data) {
          switch (response.result_data.service) {
            case actionTypes.CONNECT:
              token = response.result_data.token;
              console.log(token)
              break;
            case actionTypes.DEVICE_LIST:

          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  function sendJSON(payload= {}) {
    if (connection.connected) {
      console.log("Send: ", payload);
      connection.sendUTF(JSON.stringify(payload));
    } else {
      console.log('[Error] No connected to Socket server')
    }
  }

  sendJSON(connectPayload({ token: cui.getUniqueID() }));
  setTimeout(() => {
    if (token) {
      sendJSON(deviceListPayload({ token }));
    }
  }, 2000);
});



const connect = (masterIP) => {
  const requestUrl = `ws://${masterIP}/ws/home/overview`;
  token = null;
  client.connect(requestUrl, 'echo-protocol');
}


module.exports = {
  connect
}
