import { w3cwebsocket as W3CWebSocket } from "websocket";

const WebSocketClient = new W3CWebSocket('ws://127.0.0.1:8000');

WebSocketClient.onopen = () => {
  console.log('WebSocket Client Connected');
};

WebSocketClient.sendMessage = (data = {}) => {
  WebSocketClient.send(JSON.stringify(data));
};

WebSocketClient.receivedMessage = (callback = () => {}) => {
  WebSocketClient.onmessage = (message) => {
    callback(JSON.parse(message.data));
  }
}

export default WebSocketClient;