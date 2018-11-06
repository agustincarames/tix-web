import 'whatwg-fetch';
const apiConfig = require('../apiConfig');

function getAuthentication(token) {
  if (token) {
    return { Authorization: `JWT ${token}` };
  }
  return {};
}

function isoFetch(url, options = {}) {
  const method = options.method || 'GET';
  const body = JSON.stringify(options.body) || undefined;
  const fullUrl = apiConfig.url + url;
  return (token) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
      ...getAuthentication(token),
    };
    return fetch(fullUrl, { headers, method, body });
  };
}

module.exports = isoFetch;
