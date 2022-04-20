import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import { setUserCookie } from '../../../helpers/cookieHelper';
// import actions from './actions';

function* uploadImage({ image, uploadCallback, isUserImage }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Uploading Image'));
    let api;
    if (isUserImage) {
      api = tgpApi.uploadAvatar;
    } else {
      api = tgpApi.candidateApplication.uploadImage;
    }

    const formData = new FormData();
    formData.append('files[0]', image);
    const res = yield call(requestHelper, api, formData, true);
    if (res.success && res.data.files.length > 0) {
      uploadCallback(`${res.data.baseurl}${res.data.files[0]}`);
      if (isUserImage) {
        setUserCookie(res.updatedUser);
      }
    } else {
      yield put(
        snackbarActions.showSnakbarAction('Error uploading image', 'error'),
      );
      uploadCallback(false);
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error uploading image', 'error'),
    );
    uploadCallback(false);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.UPLOAD_IMAGE, uploadImage);
}
