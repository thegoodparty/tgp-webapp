import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import { push } from 'connected-next-router';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import {
  deleteSignupRedirectCookie,
  getSignupRedirectCookie,
  setUserCookie,
} from '/helpers/cookieHelper';

import types from './constants';
import {
  deleteApplicationStorage,
  getApplicationStorage,
} from '../../../helpers/localstorageHelper';
import actions from './actions';

function* setPassword({ password }) {
  try {
    const api = tgpApi.addPassword;
    const payload = {
      password,
    };
    const { user } = yield call(requestHelper, api, payload);
    setUserCookie(user);
    if (!user.zip) {
      yield put(push('/register/set-zipcode'));
    } else {
      const redirectCookie = getSignupRedirectCookie();
      if (redirectCookie) {
        yield put(push(redirectCookie.route));
        deleteSignupRedirectCookie();
      } else {
        const application = getApplicationStorage();
        if (application) {
          yield put(actions.saveApplicationAction(application));
        } else {
          yield put(push('/'));
        }
      }
      yield put(
        snackbarActions.showSnakbarAction(
          'Your account is protected with a password.',
        ),
      );
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put(
      snackbarActions.showSnakbarAction('Error setting your password', 'error'),
    );
  }
}

function* saveApplication({ application }) {
  try {
    yield put(
      snackbarActions.showSnakbarAction(
        'Campaign application found. Please wait while we process it.',
      ),
    );
    const api = tgpApi.candidateApplication.create;
    const { id } = yield call(requestHelper, api, null);
    application.id = id;

    const api2 = tgpApi.candidateApplication.update;
    const payload = {
      id,
      data: application,
    };
    yield call(requestHelper, api2, payload);
    yield put(push(`/campaign-application/${id}/7`));
    deleteApplicationStorage();
  } catch (error) {
    console.log('Error saving application', error);
    yield put(push('/profile'));
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.SET_PASSWORD, setPassword);
  yield takeLatest(types.SAVE_APPLICATION, saveApplication);
}
