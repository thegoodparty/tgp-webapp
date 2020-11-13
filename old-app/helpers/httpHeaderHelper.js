export const headersOptions = (body, method = 'GET', token) => {
  const headers = {
    // 'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    headers,
    method,
    mode: 'cors',
    body,
  };
};
