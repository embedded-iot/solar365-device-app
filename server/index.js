const { masterServiceController, webSocketClientController } = require('./controller');
const { deviceService } = require('./service');

const main = async () => {
  // const masterIp = await masterService.findDeviceIPInLocalNetwork()
  // console.log(masterIp)
  const device = await deviceService.getDevice();

  console.log(device)

  // await deviceService.saveDevice({ deviceData: {} })
  // const device1 = await deviceService.getDevice();
  // console.log(device1)
  // webSocketClientController.connect('192.168.1.226');

}

main();
