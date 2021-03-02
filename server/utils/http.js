const axios = require('axios');

const getAsyncWithConfig = async (url = '', config = {}) => {
  return axios.get(url, config).then(response => {
    return response.data;
  }).catch(error => {
    return error.response.data;
  })
}

module.exports = {
  getAsyncWithConfig
}

