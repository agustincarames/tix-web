import 'whatwg-fetch'
import base64 from 'base-64';

function getAuthentication(username, password) {
  console.log('authentication');
  if(username) {
    const credentials = `${username}:${password}`;
    return { 'Authorization': `Basic ${base64.encode(credentials)}` }
  }
  return {};
}

export default function isoFetch(url, options = {}) {
  const method = options.method || 'GET';
  const fullUrl = `http://localhost:3001/api${url}`;
  return (username, password) => {
    console.log(username);
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getAuthentication(username, password)
    }
    console.log(headers);
    return fetch(fullUrl, { headers: headers , method });
  }
}
