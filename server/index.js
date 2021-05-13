const { webSocketServerController, webSocketClientController } = require('./controller');
const { configService } = require('./service');
const  { findDeviceIPInLocalNetwork } = require('./middlewares/master');
const  { actionTypes } = require('./middlewares/server');
const globalConfig = require('./config/global');
const { delay } = require('./utils');

let connectCount = 0;

const masterConnect = async () => {
  const CONFIG_DATA = await configService.getConfigData();
  if (!CONFIG_DATA.MASTER_IP || connectCount >= 2) {
    connectCount = 0;
    console.log('Master finding');
    const masterDevice = await findDeviceIPInLocalNetwork({ vendor: globalConfig.vendor});
    console.log(masterDevice);
    if (!masterDevice) {
      return;
    }
    await configService.saveConfigData({
      ...CONFIG_DATA,
      MASTER_IP: masterDevice.ip,
      MASTER_API: 'http://' + masterDevice.ip,
    })
  }
  const isConnected = await webSocketClientController.connect();
  if (!isConnected) {
    connectCount++;
  } else {
    connectCount = 0;
  }
}


const main = async () => {
  await webSocketServerController.start();
  process.logObj = {
    connectTotalCount: 0,
    connectSuccessCount: 0,
    connectFailCount: 0,
    clientSendCount: 0,
    clientReceiveCount: 0
  };

  let run = true;
  while (run) {
    await masterConnect();
    console.log("Push event:" + actionTypes.REFRESH);
    webSocketServerController.sendMessage({ type: actionTypes.REFRESH });
    await delay(globalConfig.CLIENT_CONNECT_INTERVAL);
  }
}

main();
