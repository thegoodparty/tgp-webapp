import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import requestHelper from 'helpers/requestHelper';
import { getCookie, setCookie } from 'helpers/cookieHelper';
import selectDistrict from 'containers/intro/ZipFinderPage/selectors';
import selectCandidate from 'containers/elections/CandidatePage/selectors';

import tgpApi from 'api/tgpApi';
import types from './constants';
import actions from './actions';

import selectUser from './selectors';
import snackbarActions from '../../shared/SnackbarContainer/actions';

function* register(action) {
  try {
    const { email, name } = action;
    const zip = yield getZipFromStateOrCookie();
    const presidentialRank = yield getRankFromStateOrCookie('presidentialRank');
    const senateRank = yield getRankFromStateOrCookie('senateRank');
    const houseRank = yield getRankFromStateOrCookie('houseRank');
    const payload = {
      email,
      name,
      zip,
      presidentialRank: presidentialRank || '[]',
      senateRank: senateRank || '[]',
      houseRank: houseRank || '[]',
    };
    const referrer = getCookie('referrer');
    if (referrer) {
      payload.referrer = referrer;
    }
    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }
    const api = tgpApi.register;
    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    yield put(actions.registerActionSuccess(user));
    yield put(push('/you/confirmation-sent'));
    setCookie('user', JSON.stringify(user));
  } catch (error) {
    console.log(error);
    if (error.response && error.response.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    }
    yield put(actions.registerActionError(error));
  }
}

function* socialRegister(action) {
  try {
    /* eslint-disable no-underscore-dangle */
    const { user } = action;
    const profile = user._profile;
    const provider = user._provider;
    const { name, email, id, profilePicURL } = profile;
    const zip = yield getZipFromStateOrCookie();
    const presidentialRank = yield getRankFromStateOrCookie('presidentialRank');
    const senateRank = yield getRankFromStateOrCookie('senateRank');
    const houseRank = yield getRankFromStateOrCookie('houseRank');
    // for facebook - get a larger image
    let socialPic = profilePicURL;
    let idToken;
    if (provider === 'facebook') {
      try {
        const largeImage = yield call(window.FB.api, '/me/picture?width=500');
        if (largeImage) {
          socialPic = largeImage;
        }
        idToken = user._token.accessToken;
      } catch (e) {
        console.log('fb API error');
      }
    } else if (provider === 'google') {
      // for gogole removing the "=s96-c" at the end of the string returns a large image.
      try {
        const largeImg = profilePicURL.substring(0, profilePicURL.indexOf('='));
        if (largeImg) {
          socialPic = largeImg;
        }
        ({ idToken } = user._token);
      } catch (e) {
        console.log('large image error');
      }
    }

    const payload = {
      socialId: id,
      socialProvider: provider,
      socialPic,
      name,
      email,
      zip,
      presidentialRank: presidentialRank || '[]',
      senateRank: senateRank || '[]',
      houseRank: houseRank || '[]',
      socialToken: idToken,
    };
    const referrer = getCookie('referrer');
    if (referrer) {
      payload.referrer = referrer;
    }
    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const api = tgpApi.register;
    const response = yield call(requestHelper, api, payload);
    const responseUser = response.user;
    yield put(actions.registerActionSuccess(responseUser));
    yield put(push('/you/register-step2'));
    setCookie('user', JSON.stringify(responseUser));
  } catch (error) {
    if (error.response && error.response.exists) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    }
    yield put(actions.registerActionError(error));
  }
}

function* getZipFromStateOrCookie() {
  const districtState = yield select(selectDistrict);
  let zip = false;
  if (districtState && districtState.zipWithDistricts) {
    zip = districtState.zipWithDistricts.zip;
  } else {
    let cookieZip = getCookie('zip');
    if (cookieZip) {
      cookieZip = JSON.parse(cookieZip);
      zip = cookieZip.zip;
    }
  }
  return zip;
}

function* getRankFromStateOrCookie(chamber) {
  const candidateState = yield select(selectCandidate);
  if (candidateState && candidateState[chamber]) {
    return JSON.stringify(candidateState[chamber]);
  }
  const cookieRank = getCookie(chamber);
  if (cookieRank) {
    return cookieRank;
  }
  return null;
}

function* resendEmail(action) {
  try {
    const actionEmail = action.email;
    const api = tgpApi.resendEmail;
    let email;
    if (actionEmail) {
      email = actionEmail;
    } else {
      email = yield getEmailFromStateOrCookie();
    }
    console.log(email);
    const payload = {
      email: encodeURIComponent(email),
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction(
        `A confirmation email was resent to  ${email}`,
      ),
    );
  } catch (error) {
    console.log(error);
  }
}

function* getEmailFromStateOrCookie() {
  const userState = yield select(selectUser);
  if (userState && userState.user) {
    return userState.user.email;
  }
  const cookieUser = getCookie('user');
  if (cookieUser) {
    return JSON.parse(cookieUser).email;
  }
  return null;
}

function* confirmEmail(action) {
  try {
    const { email, token, fromLogin } = action;
    const api = tgpApi.confirmEmail;
    const payload = {
      email,
      token,
    };
    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    const access_token = response.token;
    yield put(actions.confirmEmailActionSuccess(user, access_token));
    if (fromLogin) {
      yield put(push('/you'));
    } else {
      yield put(push('/you/register-step2'));
    }
    setCookie('user', JSON.stringify(user));
    setCookie('token', access_token);
    if (token.length === 6) {
      yield put(snackbarActions.showSnakbarAction(`Welcome back ${user.name}`));
    } else {
      yield put(
        snackbarActions.showSnakbarAction('Your account has been verified'),
      );
    }
  } catch (error) {
    yield put(actions.confirmEmailActionError(error.response));
  }
}

function* login(action) {
  try {
    const { email } = action;
    const api = tgpApi.login;
    const payload = {
      email,
    };
    yield call(requestHelper, api, payload);
    yield put(push('/login/confirm'));
  } catch (error) {
    yield put(push('/login/confirm'));
  }
}

function* socialLogin(action) {
  try {
    /* eslint-disable no-underscore-dangle */
    const { user } = action;
    const profile = user._profile;
    const provider = user._provider;
    const { email, profilePicURL } = profile;
    let socialPic = profilePicURL;
    let idToken;
    if (provider === 'facebook') {
      try {
        const largeImage = yield call(window.FB.api, '/me/picture?width=500');
        if (largeImage) {
          socialPic = largeImage;
        }
        idToken = user._token.accessToken;
      } catch (e) {
        console.log('fb API error');
      }
    } else if (provider === 'google') {
      // for gogole removing the "=s96-c" at the end of the string returns a large image.
      try {
        const largeImg = profilePicURL.substring(0, profilePicURL.indexOf('='));
        if (largeImg) {
          socialPic = largeImg;
        }
        ({ idToken } = user._token);
      } catch (e) {
        console.log('large image error');
      }
    }
    const api = tgpApi.socialLogin;
    const payload = {
      email,
      socialPic,
      socialProvider: provider,
      socialToken: idToken,
    };
    const response = yield call(requestHelper, api, payload);
    const accessToken = response.token;
    const responseUser = response.user;
    yield put(actions.confirmEmailActionSuccess(responseUser, accessToken));
    yield put(push('/you'));
    setCookie('user', JSON.stringify(responseUser));
    setCookie('token', accessToken);

    yield put(
      snackbarActions.showSnakbarAction(`Welcome back ${responseUser.name}`),
    );
  } catch (error) {
    if (error.response && error.response.noUser) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    } else {
      yield put(snackbarActions.showSnakbarAction('Error Signing in', 'error'));
    }
  }
}

function* updateUser(action) {
  try {
    const { updatedFields } = action;
    let api;
    if (updatedFields.districtId) {
      api = tgpApi.updateAddress;
    } else {
      api = tgpApi.updateUser;
    }
    const payload = {
      ...updatedFields,
    };
    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    yield put(actions.updateUserActionSuccess(user));

    setCookie('user', JSON.stringify(user));
    yield put(snackbarActions.showSnakbarAction('Your Profile is updated'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error updating your profile', 'error'),
    );
  }
}

function* uploadAvatar(action) {
  try {
    const { fileName, fileData, withRedirect } = action;
    const api = tgpApi.uploadAvatar;
    const file = fileName && fileName.length > 0 ? fileName[0].name : false;
    const fileExt = file ? file.split('.').pop() : '';

    const data = new FormData();
    data.append('avatar', fileData);
    data.append('fileExt', fileExt);

    const response = yield call(requestHelper, api, data);
    const { user } = response;
    yield put(actions.updateUserActionSuccess(user));

    setCookie('user', JSON.stringify(user));
    yield put(
      snackbarActions.showSnakbarAction('Your Profile photo is updated'),
    );
    if (withRedirect) {
      yield put(push('/you'));
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error updating your profile photo',
        'error',
      ),
    );
  }
}

function* saveUserRanking(action) {
  try {
    const { ranking, chamber, state, district } = action;
    const api = tgpApi.updateUserRanking;
    const updatedFields = {};
    if (chamber === 'presidential') {
      updatedFields.presidentialRank = JSON.stringify(ranking);
    } else if (chamber === 'senate') {
      const chamberRanking = JSON.stringify({ [state]: ranking });
      updatedFields.senateRank = chamberRanking;
    } else if (chamber === 'house') {
      updatedFields.houseRank = JSON.stringify({ [state + district]: ranking });
    }
    const payload = {
      ...updatedFields,
    };
    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    yield put(actions.updateUserActionSuccess(user));

    setCookie('user', JSON.stringify(user));
    yield put(snackbarActions.showSnakbarAction('Your ranking were saved'));
    // yield put(push('/you/share'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving your ranking', 'error'),
    );
  }
}

function* generateUuid() {
  const user = getCookie('user');
  const guestUuid = getCookie('guuid');
  if (!user && !guestUuid) {
    const uuid = Math.random()
      .toString(36)
      .substring(2, 12);
    setCookie('guuid', uuid);
  }
}

function* crew() {
  try {
    const api = tgpApi.crew;
    const response = yield call(requestHelper, api, null);
    yield put(actions.crewActionSuccess(response.crew));
  } catch (error) {
    console.log('crew error', error);
  }
}

// Individual exports for testing
export default function* saga() {
  const registerAction = yield takeLatest(types.REGISTER, register);
  const socialRegisterAction = yield takeLatest(
    types.SOCIAL_REGISTER,
    socialRegister,
  );
  const resendAction = yield takeLatest(types.RESEND_EMAIL, resendEmail);
  const confirmAction = yield takeLatest(types.CONFIRM_EMAIL, confirmEmail);
  const loginAction = yield takeLatest(types.LOGIN, login);
  const socialLoginAction = yield takeLatest(types.SOCIAL_LOGIN, socialLogin);
  const updateAction = yield takeLatest(types.UPDATE_USER, updateUser);
  const avatarAction = yield takeLatest(types.UPLOAD_AVATAR, uploadAvatar);
  const saveUserRankingAction = yield takeLatest(
    types.SAVE_USER_RANKING,
    saveUserRanking,
  );
  yield takeLatest(types.GENERATE_UUID, generateUuid);
  yield takeLatest(types.CREW, crew);
}
