import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import requestHelper from 'helpers/requestHelper';
import {
  deleteCookie,
  getCookie,
  getUserCookie,
  setCookie,
  setUserCookie,
  getSignupRedirectCookie,
} from 'helpers/cookieHelper';
import selectDistrict from 'containers/intro/ZipFinderPage/selectors';
import selectCandidate from 'containers/elections/CandidatePage/selectors';

import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import districtActions from 'containers/intro/ZipFinderPage/actions';

import tgpApi from 'api/tgpApi';
import { candidateBlocName } from 'helpers/electionsHelper';
import AnalyticsService from 'services/AnalyticsService';
import globalActions from 'containers/App/actions';
import types from './constants';
import actions from './actions';

import selectUser from './selectors';
import ENV from '../../../api/ENV';

function* sendCreatorMessage(action) {
  try {
    const { messageInfo } = action;
    const api = tgpApi.creator.message;
    const payload = messageInfo;
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction(
        `This message was sent to ${messageInfo.creatorEmail}`,
      ),
    );
  } catch (error) {
    console.log(error);
  }
}
function* register(action) {
  try {
    const { email, name, password } = action;
    const zip = yield getZipFromStateOrCookie();
    const ranking = getCookie('guestRanking') || '[]';

    const payload = {
      email,
      name,
      password,
      zip,
      ranking,
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
    const { user, token } = response;
    yield put(actions.registerActionSuccess(user, token));
    setUserCookie(user);
    setCookie('token', token);
    deleteCookie('guestRanking');
    yield put(push('/you'));
    AnalyticsService.sendEvent('email-register', 'success');
  } catch (error) {
    if (error.response?.exists) {
      yield put(
        snackbarActions.showSnakbarAction(
          `The email ${
            action.email
          } already exists in our system. Try signing in.`,
        ),
      );
      yield put(push('/login'));
    } else {
      console.log(error);
      yield put(actions.registerActionError(error));
    }
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
    const ranking = getCookie('guestRanking') || '[]';
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
      ranking,
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

    const access_token = response.token;
    yield put(actions.confirmEmailActionSuccess(responseUser, access_token));

    const cookieRedirect = getSignupRedirectCookie();
    if (cookieRedirect) {
      yield put(push(cookieRedirect.route));
    } else {
      yield put(push(location.pathname));
    }

    setUserCookie(responseUser);
    setCookie('token', access_token);
    AnalyticsService.sendEvent('social-register', 'success');
  } catch (error) {
    if (error.response?.exists) {
      // user is already in our system, try login.
      yield put(actions.socialLoginAction(action.user));
    } else {
      yield put(actions.registerActionError(error));
      AnalyticsService.sendEvent('social-register', 'error');
      yield put(globalActions.logErrorAction('social register error', error));
    }
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
    const payload = {
      email: encodeURIComponent(email),
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction(
        `A verification email was resent to  ${email}`,
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
  const cookieUser = getUserCookie();
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

    setUserCookie(user);
    setCookie('token', access_token);
    if (token.length === 6) {
      yield put(snackbarActions.showSnakbarAction(`Welcome back ${user.name}`));
    } else {
      yield put(
        snackbarActions.showSnakbarAction('Your account has been verified'),
      );
    }
    if (fromLogin) {
      yield put(push('/you'));
    } else {
      const cookieRedirect = getSignupRedirectCookie();
      if (cookieRedirect) {
        yield put(push(cookieRedirect.route));
      } else {
        yield put(push('/you'));
      }
    }
    AnalyticsService.sendEvent('email-login-confirm', 'success');
  } catch (error) {
    console.log('error at email conriamtion', error);
    yield put(actions.confirmEmailActionError(error.response));
    AnalyticsService.sendEvent('email-login-confirm', 'error');
    yield put(globalActions.logErrorAction('email login confirm error', error));
  }
}

function* login(action) {
  try {
    const { email, password } = action;
    const api = tgpApi.login;
    const payload = {
      email,
      password,
    };
    const response = yield call(requestHelper, api, payload);
    const { user, token } = response;
    yield put(actions.registerActionSuccess(user, token));
    setUserCookie(user);
    setCookie('token', token);
    deleteCookie('guestRanking');
    yield put(push('/you'));
    AnalyticsService.sendEvent('email-login', 'success');
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Email or Password are incorrect.',
        'error',
      ),
    );
    AnalyticsService.sendEvent('email-login', 'error');
    yield put(globalActions.logErrorAction('email login error', error));
  }
}

function* forgotPassword(action) {
  try {
    const { email } = action;
    const api = tgpApi.forgotPassword;
    const payload = {
      email,
    };
    yield call(requestHelper, api, payload);
    yield put(push('/login'));
    yield put(
      snackbarActions.showSnakbarAction(
        `We sent an email to ${email}, which contains a link to reset your password.`,
      ),
    );
    AnalyticsService.sendEvent('forgot-password', 'success');
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction(
        'Error sending password reset email.',
        'error',
      ),
    );
    AnalyticsService.sendEvent('forgot-password', 'error');
    yield put(globalActions.logErrorAction('forgot password error', error));
  }
}

function* resetPassword(action) {
  try {
    const { email, password, token } = action;
    const api = tgpApi.resetPassword;
    const payload = {
      email,
      password,
      token,
    };
    yield call(requestHelper, api, payload);
    yield put(push('/login'));
    yield put(
      snackbarActions.showSnakbarAction(`Your password has been reset`),
    );
    AnalyticsService.sendEvent('reset-password', 'success');
  } catch (error) {
    if (error.response?.expired) {
      yield put(
        snackbarActions.showSnakbarAction(
          'Your token is either invalid or expired.',
          'error',
        ),
      );
      AnalyticsService.sendEvent('reset-password', 'expired token');
      yield put(globalActions.logErrorAction('reset password expired', error));
    } else {
      yield put(
        snackbarActions.showSnakbarAction(
          'Error resetting your password.',
          'error',
        ),
      );
      AnalyticsService.sendEvent('reset-password', 'error');
      yield put(globalActions.logErrorAction('reset password error', error));
    }
  }
}

function* changePassword({ newPassword, oldPassword }) {
  try {
    const api = tgpApi.changePassword;
    const payload = {
      newPassword,
      oldPassword,
    };
    yield call(requestHelper, api, payload);
    yield put(
      snackbarActions.showSnakbarAction(`Your password has been changed`),
    );
    AnalyticsService.sendEvent('change-password', 'success');
  } catch (error) {
    if (error.response?.incorrect) {
      yield put(
        snackbarActions.showSnakbarAction(
          'Current Password is incorrect',
          'error',
        ),
      );
      AnalyticsService.sendEvent(
        'change-password',
        'error - incorrect password',
      );
      yield put(
        globalActions.logErrorAction(
          'change password - incorrect password',
          error,
        ),
      );
    } else {
      yield put(
        snackbarActions.showSnakbarAction(
          'Error changing your password.',
          'error',
        ),
      );
      AnalyticsService.sendEvent('change-password', 'error');
      yield put(globalActions.logErrorAction('change password error', error));
    }
  }
}

function* addPassword({ newPassword }) {
  try {
    const api = tgpApi.addPassword;
    const payload = {
      newPassword,
    };
    const response = yield call(requestHelper, api, payload);
    const { user } = response;
    yield put(actions.updateUserActionSuccess(user));
    setUserCookie(user);
    yield put(
      snackbarActions.showSnakbarAction(`Your password has been added`),
    );
    AnalyticsService.sendEvent('add-password', 'success');
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error adding your password.', 'error'),
    );
    AnalyticsService.sendEvent('add-password', 'error');
    yield put(globalActions.logErrorAction('add password error', error));
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
    const cookieRedirect = getSignupRedirectCookie();

    if (cookieRedirect) {
      yield put(push(cookieRedirect.route));
    } else {
      yield put(push('/you'));
    }

    setUserCookie(responseUser);
    setCookie('token', accessToken);

    yield put(
      snackbarActions.showSnakbarAction(`Welcome back ${responseUser.name}`),
    );
    AnalyticsService.sendEvent('social-login', 'success', provider);
  } catch (error) {
    if (error.response && error.response.noUser) {
      yield put(
        snackbarActions.showSnakbarAction(error.response.message, 'error'),
      );
    } else {
      yield put(snackbarActions.showSnakbarAction('Error Signing in', 'error'));
    }
    AnalyticsService.sendEvent(
      'social-login',
      'error',
      action?.user?._provider,
    );
    yield put(
      globalActions.logErrorAction(
        `social login error. provider: ${action?.user?._provider}`,
        error,
      ),
    );
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

    setUserCookie(user);
    yield put(snackbarActions.showSnakbarAction('Your Profile is updated'));
  } catch (error) {
    console.log('Error updading user', error);
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
    setUserCookie(user);
    yield put(
      snackbarActions.showSnakbarAction('Your Profile photo is updated'),
    );
    if (withRedirect) {
      yield put(push('/you'));
    }
  } catch (error) {
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
    const { candidate, rank, chamber, state, district } = action;
    const api = tgpApi.rankCandidate;
    const payload = {
      rank,
      candidateId: candidate.id,
      chamber,
      state,
      isIncumbent: candidate.isIncumbent,
    };
    const { ranking } = yield call(requestHelper, api, payload);
    yield put(actions.userRankingActionSuccess(ranking));

    yield put(snackbarActions.showSnakbarAction('Your ranking were saved'));

    if (chamber === 'presidential') {
      yield put(districtActions.loadAllPresidentialAction());
    } else if (chamber === 'senate') {
      yield put(districtActions.loadSenateCandidatesAction(state));
    } else {
      yield put(districtActions.loadHouseCandidatesAction(state, district));
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving your ranking', 'error'),
    );
  }
}

function* saveGuestRanking(action) {
  try {
    const { candidate, rank, chamber } = action;
    const rankingCookie = getCookie('guestRanking');
    const ranking = rankingCookie ? JSON.parse(rankingCookie) : [];
    const blocName = candidateBlocName(candidate);

    ranking.push({
      id: `cookie-${chamber}-${candidate.id}${
        candidate.isIncumbent ? '-i' : ''
      }`,
      rank,
      candidate: candidate.id,
      chamber,
      isIncumbent: !!candidate.isIncumbent,
      blocName,
    });
    setCookie('guestRanking', JSON.stringify(ranking));

    yield put(actions.userRankingActionSuccess(ranking));
    yield put(
      snackbarActions.showSnakbarAction('Your guest ranking were saved'),
    );
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error saving your ranking', 'error'),
    );
  }
}

function* deleteAllUserRankings() {
  try {
    const api = tgpApi.deleteAllUserRankings;
    yield call(requestHelper, api, null);
    yield put(actions.userRankingAction());
    yield put(snackbarActions.showSnakbarAction('Your rankings were deleted'));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting your ranking', 'error'),
    );
  }
}

function* deleteCandidateRanking(action) {
  try {
    const { id, chamber, state, district } = action;
    const payload = { id };
    const api = tgpApi.deleteCandidateRanking;
    yield call(requestHelper, api, payload);
    yield put(actions.userRankingAction());
    yield put(snackbarActions.showSnakbarAction('Your ranking was deleted'));
    if (chamber === 'presidential') {
      yield put(districtActions.loadAllPresidentialAction());
    } else if (chamber === 'senate') {
      yield put(districtActions.loadSenateCandidatesAction(state));
    } else {
      yield put(districtActions.loadHouseCandidatesAction(state, district));
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting your ranking', 'error'),
    );
  }
}

function* deleteGuestRanking(action) {
  try {
    const { rankToDelete } = action;
    const { rank, chamber } = rankToDelete;
    const rankingCookie = getCookie('guestRanking');
    if (rankingCookie) {
      const ranking = JSON.parse(rankingCookie);
      const newRanking = [];
      ranking.forEach(existingRank => {
        if (existingRank.chamber !== chamber || existingRank.rank < rank) {
          newRanking.push(existingRank);
        }
      });
      setCookie('guestRanking', JSON.stringify(newRanking));
      yield put(actions.userRankingActionSuccess(newRanking));
    }
    yield put(
      snackbarActions.showSnakbarAction('Your guest ranking was deleted'),
    );
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting your ranking', 'error'),
    );
  }
}

function* generateUuid() {
  const user = getUserCookie();
  const guestUuid = getCookie('guuid');
  if (!user && !guestUuid) {
    const uuid = Math.random()
      .toString(36)
      .substring(2, 12);
    setCookie('guuid', uuid);
  }
}

function* crew({ preview }) {
  try {
    const api = tgpApi.crew;
    const payload = {
      preview,
    };
    const response = yield call(requestHelper, api, payload);
    if (preview) {
      yield put(
        actions.crewPreviewActionSuccess(response.crew, response.crewCount),
      );
    } else {
      yield put(actions.crewActionSuccess(response.crew));
    }
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}

function* leaderboard() {
  try {
    const api = tgpApi.leaderboard;
    const response = yield call(requestHelper, api, null);
    console.log('saga', response.leaderboard);
    yield put(actions.leaderboardActionSuccess(response.leaderboard));
  } catch (error) {
    console.log('crew error', JSON.stringify(error));
  }
}

function* userRanking() {
  try {
    const api = tgpApi.userRanking;
    const { ranking } = yield call(requestHelper, api, null);
    yield put(actions.userRankingActionSuccess(ranking));
  } catch (error) {
    console.log('user ranking ranking', JSON.stringify(error));
  }
}

function* guestRanking() {
  try {
    const rankingCookie = getCookie('guestRanking');
    if (rankingCookie) {
      const ranking = JSON.parse(rankingCookie);
      yield put(actions.userRankingActionSuccess(ranking));
    }
  } catch (error) {
    console.log('guest ranking error', JSON.stringify(error));
  }
}

function* twitterLogin() {
  try {
    const api = tgpApi.twitterLogin;

    const { url } = yield call(requestHelper, api, null);
    window.location.href = url;
  } catch (error) {
    console.log('twitter login error', JSON.stringify(error));
    yield put(
      snackbarActions.showSnakbarAction('Twitter Login Error', 'error'),
    );
  }
}

function* confirmTwitterCallback({ oauthToken, oauthVerifier }) {
  try {
    const api = tgpApi.confirmTwitterCallback;

    const zip = yield getZipFromStateOrCookie();
    const ranking = getCookie('guestRanking') || '[]';
    const payload = {
      oauthToken,
      oauthVerifier,
      zip,
      ranking,
    };
    const referrer = getCookie('referrer');
    if (referrer) {
      payload.referrer = referrer;
    }
    const guestUuid = getCookie('guuid');
    if (guestUuid) {
      payload.guestUuid = guestUuid;
    }

    const { user, token } = yield call(requestHelper, api, payload);
    yield put(actions.confirmEmailActionSuccess(user, token));
    const cookieRedirect = getSignupRedirectCookie();
    if (cookieRedirect) {
      yield put(push(cookieRedirect.route));
    } else {
      yield put(push('/you'));
    }

    setUserCookie(user);
    setCookie('token', token);

    yield put(snackbarActions.showSnakbarAction(`Welcome back ${user.name}`));
    AnalyticsService.sendEvent('social-login', 'success', 'twitter');
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Twitter Confirmation Error', 'error'),
    );
    console.log('confirm Twitter Callback error', JSON.stringify(error));
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
  const forgotPasswordAction = yield takeLatest(
    types.FORGOT_PASSWORD,
    forgotPassword,
  );
  const resetPasswordAction = yield takeLatest(
    types.RESET_PASSWORD,
    resetPassword,
  );
  const changePasswordAction = yield takeLatest(
    types.CHANGE_PASSWORD,
    changePassword,
  );
  const addPasswordAction = yield takeLatest(types.ADD_PASSWORD, addPassword);
  const socialLoginAction = yield takeLatest(types.SOCIAL_LOGIN, socialLogin);
  const updateAction = yield takeLatest(types.UPDATE_USER, updateUser);
  const avatarAction = yield takeLatest(types.UPLOAD_AVATAR, uploadAvatar);
  const creatorMessageAction = yield takeLatest(
    types.SEND_MESSAGE_TO_CREATOR,
    sendCreatorMessage,
  );

  const saveUserRankingAction = yield takeLatest(
    types.SAVE_USER_RANKING,
    saveUserRanking,
  );
  const saveGuestRankingAction = yield takeLatest(
    types.SAVE_GUEST_RANKING,
    saveGuestRanking,
  );
  yield takeLatest(types.DELETE_ALL_USER_RANKINGS, deleteAllUserRankings);
  const deleteRanking = yield takeLatest(
    types.DELETE_CANDIDATE_RANKING,
    deleteCandidateRanking,
  );
  yield takeLatest(types.GENERATE_UUID, generateUuid);
  const crewAction = yield takeLatest(types.CREW, crew);
  yield takeLatest(types.LEADERBOARD, leaderboard);
  yield takeLatest(types.USER_RANKING, userRanking);
  yield takeLatest(types.GUEST_RANKING, guestRanking);
  const deleteGuest = yield takeLatest(
    types.DELETE_GUEST_RANKING,
    deleteGuestRanking,
  );
  const twitterAction = yield takeLatest(types.TWITTER_LOGIN, twitterLogin);
  const confirmTwitterAction = yield takeLatest(
    types.CONFIRM_TWITTER_CALLBACK,
    confirmTwitterCallback,
  );
}
