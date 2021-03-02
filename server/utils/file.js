const fs = require('fs')

const dir = './server/data';
const writeFile = (filePath = '', data = '') => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

const readFile = (filePath = '') => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

const readJSONFile = async (filePath = '') => {
  try {
    const data = await readFile(filePath)
    if (data) {
      return JSON.parse(data)
    }
    return {}
  } catch (error) {
    return {}
  }
}

const writeJSONFile = async (filePath = '', jsonObj = {}) => {
  try {
    await writeFile(filePath, JSON.stringify(jsonObj))
  } catch (error) {

  }
}

module.exports = {
  readJSONFile,
  writeJSONFile
}
