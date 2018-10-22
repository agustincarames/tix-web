import 'whatwg-fetch';

function getAuthentication(token) {
  if (token) {
    return { Authorization: `JWT ${token}` };
  }
  return {};
}

function isoFetch(url, options = {}) {
  const method = options.method || 'GET';
  const body = JSON.stringify(options.body) || undefined;
  const fullUrl = "http://localhost:3001/api" + url; //config.api_url + url;
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
