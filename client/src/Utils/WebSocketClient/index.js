import { w3cwebsocket as W3CWebSocket } from "websocket";
import Events from "../Events";

class WebSocketClient {
  constructor() {
    if (this.connection) return;
    this.connectWebsocket();

    setInterval(() => {
      this.connectWebsocket();
    }, 5000);
  }

  connectWebsocket = () => {
    if (!this.isConnected) {
      console.log("Connecting websocket");
      this.connection = new W3CWebSocket('ws://127.0.0.1:8000');
      this.isConnected = false;
      this.connection.onopen = () => {
        this.isConnected = true;
        console.log('WebSocket Client Connected');
        Events.publish("WEBSOCKET_CONNECTED");
      };
      this.connection.onclose = () => {
        this.isConnected = false;
        console.log("WebSocket Client Closed");
      };
      this.connection.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);
          if (data.type === "Refresh") {
            console.log('Refresh');
            this.payload && this.sendMessage(this.payload);
          }
          this.onReceivedMessage && this.onReceivedMessage(data);
        } catch (error) {
          console.log(error);
        }
      };
    }
  }

  sendMessage = (data = {}) => {
    this.payload = data;
    this.connection.send(JSON.stringify(data));
  };

  receivedMessage = (callback = () => {}) => {
    this.onReceivedMessage = callback;
  };
}

const webSocketClient = new WebSocketClient();

export default webSocketClient;
