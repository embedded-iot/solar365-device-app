const fs = require('fs')
const path = require('path')

const root = '../data';

const dir = path.resolve(__dirname, );

const writeFile = (filePath = '', data = '') => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(dir, filePath), data, (err) => {
      if (err) {
        reject(err)
      }
      resolve(true)
    })
  })
}

const writeAppendFile = (filePath = '', data = '') => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(dir, filePath), data, (err) => {
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

const readJSONFile = async (fileName = '') => {
  try {
    const filePath = path.resolve(__dirname, root, fileName)
    const data = await readFile(filePath);
    if (data) {
      return JSON.parse(data)
    }
    return {}
  } catch (error) {
    console.log(error)
    return {}
  }
}

const writeJSONFile = async (fileName = '', jsonObj = {}) => {
  try {
    const filePath = path.resolve(__dirname, root, fileName);
    await writeFile(filePath, JSON.stringify(jsonObj))
  } catch (error) {
    console.log(error)
  }
}


const writeTextFile = async (fileName = '', str = '') => {
  try {
    const filePath = path.resolve(__dirname, root, fileName);
    await writeAppendFile(filePath, str)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  readJSONFile,
  writeJSONFile,
  writeTextFile,
}
