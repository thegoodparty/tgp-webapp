/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  console.log('ERROR at fetchHelper', JSON.stringify(response));
  const res = await response.json();
  const message = res ? res.message : 'Error occured';
  const error = new Error(message);
  error.response = res;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function fetchHelper(url, options) {
  if (options?.method === 'GET') {
    delete options.body;
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
