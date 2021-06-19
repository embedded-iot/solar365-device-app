const axios = require('axios');

const getAsyncWithConfig = async (url = '', config = {}) => {
  return axios.get(url, config).then(response => {
    try {
      return JSON.parse(response.data);
    } catch (e) {
      return null;
    }
  }).catch(error => {
    return error.response && error.response.data || null;
  })
}

const postWithConfig = async (url = '', data, config = {}) => {
  return axios.post(url, data, config).then(response => {
    return response.data;
  }).catch(error => {
    return error.response && error.response.data || null;
  })
}

module.exports = {
  getAsyncWithConfig,
  postWithConfig,
}

