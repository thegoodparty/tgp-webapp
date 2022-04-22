import { API_ENV } from '../api/ENV';

let apiBase = 'https://api.goodparty.org/api/v1/';
let base = 'https://goodparty.org';
if (API_ENV === 'local') {
  apiBase = 'http://localhost:1337/api/v1/';
  base = 'http://localhost:4000';
} else if (API_ENV === 'dev' || API_ENV === 'development') {
  apiBase = 'https://api-dev.goodparty.org/api/v1/';
  base = 'https://dev.goodparty.org';
} else if (API_ENV === 'qa') {
  apiBase = 'https://api-qa.goodparty.org/api/v1/';
  base = 'https://qa.goodparty.org';
} else if (API_ENV === 'prod') {
  apiBase = 'https://api.goodparty.org/api/v1/';
  base = 'https://goodparty.org';
}

export default { apiBase, base };
