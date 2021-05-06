import { w3cwebsocket as W3CWebSocket } from "websocket";
import Events from "../Events";

class WebSocketClient {
  constructor() {
    if (this.connection) return;
    this.connection = new W3CWebSocket('ws://127.0.0.1:8000');
    this.connection.onopen = () => {
      console.log('WebSocket Client Connected');
      Events.publish("WEBSOCKET_CONNECTED");
    };
  }

  sendMessage = (data = {}) => {
    this.connection.send(JSON.stringify(data));
  };

  receivedMessage = (callback = () => {}) => {
    this.connection.onmessage = (message) => {
      callback(JSON.parse(message.data));
    };
  };
}

const webSocketClient = new WebSocketClient();

export default webSocketClient;
