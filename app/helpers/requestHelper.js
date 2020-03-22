import { call, select, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import userActions from 'containers/you/YouPage/actions';
import { makeSelectToken } from 'containers/you/YouPage/selectors';
import { headersOptions } from './httpHeaderHelper';
import fetchHelper from './fetchHelper';

export default function* requestHelper(api, data) {
  let { url } = api;
  const { method, withAuth } = api;
  if (method === 'GET' && data) {
    url = `${url}?`;
    for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        url += `${key}=${data[key]}&`;
      }
    }
    url = url.slice(0, -1);
  }
  let body = null;
  if ((method === 'POST' || method === 'PUT') && data) {
    body = JSON.stringify(data);
  }
  let token;
  if (withAuth) {
    token = yield select(makeSelectToken());
    if (!token) {
      yield put(userActions.signoutAction());
      yield put(push('/login'));
      throw new Error({ message: 'missing token' });
    }
  }

  const requestOptions = headersOptions(body, api.method, token);
  return yield call(fetchHelper, url, requestOptions);
}
