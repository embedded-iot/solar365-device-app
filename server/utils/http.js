const axios = require('axios');

const getAsyncWithConfig = async (url = '', config = {}) => {
  console.log(url)
  return axios.get(url, config).then(response => {
    return response.data;
  }).catch(error => {
    console.log(error)
    return error.response && error.response.data || null;
  })
}

module.exports = {
  getAsyncWithConfig
}

