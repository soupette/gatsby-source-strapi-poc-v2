const axios = require('axios').default;

const createInstance = (config) => {
  const headers = { ...config?.headers };

  if (config.accessToken) {
    headers.authorization = `Bearer ${config.accessToken}`;
  }

  const instance = axios.create({
    baseURL: config.apiURL,
    headers,
  });

  instance.interceptors.response.use((response) => response.data);

  return instance;
};

module.exports = createInstance;
