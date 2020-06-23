import { call, put, takeLatest } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* loadCandidates(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Candidates'));
    const { chamber } = action;
    const api = tgpApi.admin.candidates;
    const payload = { chamber };
    const { candidates } = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidatesSuccess(candidates));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Candidates', 'error'),
    );
    yield put(actions.loadCandidatesError(error));
  }
}

function* loadAllUsers() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Users'));
    const api = tgpApi.admin.allUsers;
    const { users } = yield call(requestHelper, api, null);
    yield put(actions.loadAllUsersSuccess(users));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Users', 'error'),
    );
    yield put(actions.loadAllUsersError(error));
  }
}

function* loadArticlesFeedback() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Articles Feedback'));
    const api = tgpApi.admin.articlesFeedback;
    const { articles } = yield call(requestHelper, api, null);
    console.log('articles', articles);
    yield put(actions.loadArticlesFeedbackSuccess(articles));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Articles', 'error'),
    );
  }
}

function* updateCandidate(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Updating Candidate'));
    const { id, updatedFields, chamber, isIncumbent, isEdit } = action;
    const api = tgpApi.admin.updateCandidate;
    const payload = { id, updatedFields, chamber, isIncumbent };
    const { candidate } = yield call(requestHelper, api, payload);
    if (isEdit) {
      yield put(actions.editCandidateSuccess(candidate));
    } else {
      yield put(actions.updateCandidateSuccess(candidate));
    }
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Updating Candidate', 'error'),
    );
    yield put(actions.loadCandidatesError(error));
  }
}

function* updateCandidateImage(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Updating Candidate Image'));
    let { base64, candidate, chamber } = action;
    if (chamber === 'presidential-i') {
      chamber = 'presidential';
    }
    const { id, isIncumbent } = candidate;
    const api = tgpApi.admin.updateCandidateImage;
    const payload = { base64, id, chamber, isIncumbent };
    const response = yield call(requestHelper, api, payload);
    yield put(actions.editCandidateSuccess(response.candidate));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction(
        'Error Upading Candidate Iamge',
        'error',
      ),
    );
    yield put(actions.loadCandidatesError(error));
  }
}

function* loadCandidate(action) {
  try {
    const api = tgpApi.findCandidate;
    const { id, chamber, isIncumbent } = action;
    const payload = { id, chamber, isIncumbent };
    const candidate = yield call(requestHelper, api, payload);
    yield put(actions.loadCandidateActionSuccess(candidate));
  } catch (error) {
    console.log(error);
    yield put(actions.loadCandidateActionError(error));
  }
}

// Individual exports for testing
export default function* saga() {
  const candAction = yield takeLatest(types.LOAD_CANDIDATES, loadCandidates);
  yield takeLatest(types.LOAD_ALL_USERS, loadAllUsers);
  yield takeLatest(types.LOAD_ARTICLES_FEEDBACK, loadArticlesFeedback);
  const updateCandAction = yield takeLatest(
    types.UPDATE_CANDIDATE,
    updateCandidate,
  );
  const updateCandImageAction = yield takeLatest(
    types.UPDATE_CANDIDATE_IMAGE,
    updateCandidateImage,
  );

  const loadCandAction = yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);
}
