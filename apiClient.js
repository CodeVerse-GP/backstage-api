const axios = require('axios');
const { BACKSTAGE_API_URL } = require('./config');
const { BACKSTAGE_API_KEY } = require('./config');

const apiClient = axios.create({
  baseURL: BACKSTAGE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${BACKSTAGE_API_KEY}`,
  },
});

module.exports = apiClient;
