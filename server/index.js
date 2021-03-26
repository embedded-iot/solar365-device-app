const { webSocketServerController, webSocketClientController } = require('./controller');
const { configService } = require('./service');
const  { findDeviceIPInLocalNetwork } = require('./middlewares/master');
const globalConfig = require('./config/global');

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
  await masterConnect();
  setInterval(async () => {
    await masterConnect();
  }, globalConfig.CLIENT_CONNECT_INTERVAL);

  // await webSocketServerController.start();
}

main();
