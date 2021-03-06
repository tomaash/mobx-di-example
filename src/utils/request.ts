import 'whatwg-fetch';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  throw error;
}

export async function request(url: string, options?: object) {
  const res = await fetch(url, options)
  return parseJSON(checkStatus(res))
}
