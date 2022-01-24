import { call, select, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import userActions from 'containers/you/YouPage/actions';
import { makeSelectToken } from 'containers/you/YouPage/selectors';
import { headersOptions } from './httpHeaderHelper';
import fetchHelper from './fetchHelper';
import snackbarActions from '../containers/shared/SnackbarContainer/actions';
import { getCookie } from './cookieHelper';

export default function* requestHelper(api, data, isFormData = false) {
  let { url } = api;
  console.log('requestHleper1', url);
  const { method, withAuth } = api;
  if ((method === 'GET' || method === 'DELETE') && data) {
    url = `${url}?`;
    for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        url += `${key}=${data[key]}&`;
      }
    }
    url = url.slice(0, -1);
  }
  let body = data;
  console.log('requestHleper2', body);
  if ((method === 'POST' || method === 'PUT') && data && !isFormData) {
    body = JSON.stringify(data);
  }
  let token;
  if (withAuth) {
    // try "asToken" first
    token = getCookie('asToken');
    if (!token) {
      token = yield select(makeSelectToken());
      if (!token) {
        token = getCookie('token');
        if (!token) {
          // yield put(userActions.signoutAction('/login'));
          throw new Error({ message: 'missing token' });
        }
      }
    }
  }
  console.log('requestHleper3', token);

  const requestOptions = headersOptions(body, api.method, token);
  // if (data instanceof FormData) {
  //   requestOptions.headers['Content-Type'] = 'multipart/form-data';
  // }
  try {
    console.log('requestHleper4');
    return yield call(fetchHelper, url, requestOptions);
  } catch (e) {
    console.log('error in requestHelper5', e);
    if (e && e.response && e.response.err === 'Invalid token') {
      yield put(
        snackbarActions.showSnakbarAction('Please login again', 'error'),
      );
      // yield put(userActions.signoutAction('/login'));
      throw new Error({ message: 'invalid token' });
    } else {
      console.log('error in requestHelper6', e);
      throw e;
    }
  }
}
