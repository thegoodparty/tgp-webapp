import { all, call, put, takeLatest, select, fork, take, cancel } from 'redux-saga/effects';
import { getCookie, setUserCookie, setCookie } from 'helpers/cookieHelper';
import requestHelper from 'helpers/requestHelper';
import { getUuid, getUserFromStateOrCookie } from 'helpers/userHelper';
import makeSelectUser from 'containers/you/YouPage/selectors';
import youActions from 'containers/you/YouPage/actions';

import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';
import snackbarActions from '../shared/SnackbarContainer/actions';

function* loadContent() {
  try {
    const api = tgpApi.content;
    const content = yield call(requestHelper, api, null);
    yield put(actions.loadContentActionSuccess(content));
  } catch (error) {
    console.log(error);
    yield put(actions.loadContentActionError(error));
  }
}

function* refreshToken() {
  try {
    const api = tgpApi.refreshToken;
    const { token, user } = yield call(requestHelper, api, null);
    yield put(youActions.registerActionSuccess(user, token));
    setUserCookie(user);
    setCookie('token', token);
  } catch (error) {
    console.log(error);
  }
}
function* logError(action) {
  try {
    const user = yield call(getUserFromStateOrCookie);
    const uuid = getUuid(user);
    const { error, message } = action;
    const api = tgpApi.logError;
    const payload = {
      message,
      error: typeof error === 'string' ? error : JSON.stringify(error),
      uuid,
    };
    yield call(requestHelper, api, payload);
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield all([
    takeLatest(types.LOAD_CONTENT, loadContent),
    takeLatest(types.LOG_ERROR, logError),
    takeLatest(types.REFRESH_TOKEN, refreshToken),
  ]);
}
