const netList = require('network-list');

const scanAllIP = () => {
  return new Promise((resolve, reject) => {
    netList.scan({}, (err, ips) => {
      if (err) {
        reject(err)
      } else {
        resolve(ips)
      }
    })
  })
}

module.exports = {
  scanAllIP
}
