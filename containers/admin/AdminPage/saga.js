import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from 'helpers/requestHelper';
import tgpApi from 'api/tgpApi';
import snackbarActions from 'containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';
import { selectAdminPageDomain } from './selectors';

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

function* deleteUser(action) {
  try {
    const { user } = action;
    yield put(snackbarActions.showSnakbarAction('Deleting User'));
    const api = tgpApi.admin.deleteUser;
    const payload = { id: user.id };
    yield call(requestHelper, api, payload);
    yield put(actions.deleteUserSuccess(user));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error Deleting User', 'error'),
    );
  }
}

function* loadArticlesFeedback() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Articles Feedback'));
    const api = tgpApi.admin.articlesFeedback;
    const { articles } = yield call(requestHelper, api, null);
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
    const { id, updatedFields, chamber, isIncumbent, isEdit, updates } = action;
    const api = tgpApi.admin.updateCandidate;
    const payload = { id, updatedFields, chamber, isIncumbent, updates };
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
    chamber = chamber.replace('-i', '');

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

function* loadVoterizeList() {
  try {
    yield put(snackbarActions.showSnakbarAction('Loading Voterize List'));
    const api = tgpApi.admin.voterize;
    const { candidates } = yield call(requestHelper, api, null);
    yield put(actions.loadVoterizeActionSuccess(candidates));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error Loading Voterize List', 'error'),
    );
    yield put(actions.loadVoterizeActionError(error));
  }
}

function* deleteUpdate({ candidateId, chamber, isIncumbent, updateId }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Deleting Update'));
    const api = tgpApi.admin.deleteUpdate;
    const payload = {
      candidateId,
      chamber,
      isIncumbent,
      updateId,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.loadCandidateAction(candidateId, chamber, isIncumbent));
  } catch (error) {
    console.log(error);
    yield put(
      snackbarActions.showSnakbarAction('Error deleting update', 'error'),
    );
    yield put(actions.loadVoterizeActionError(error));
  }
}

function* updateVoterize(action) {
  try {
    yield put(snackbarActions.showSnakbarAction('Updating Voterize'));
    const { voterizeList } = yield select(selectAdminPageDomain);
    let { voterize } = action;
    const api = tgpApi.admin.updateVoterize;
    const payload = voterize;
    const { newVotesNeeded } = yield call(requestHelper, api, payload);

    const { candidate, likeyVoters, votesNeeded } = voterize;
    if (likeyVoters) {
      for (let i = 0; i < voterizeList.length; i++) {
        const originalVoterize = voterizeList[i];
        if (
          originalVoterize.name === candidate.name &&
          originalVoterize.id === candidate.id &&
          originalVoterize.chamber === candidate.chamber
        ) {
          voterizeList[i] = candidate;
          break;
        }
      }
    } else {
      const { chamber, state, district } = candidate;
      const lowerChamber = chamber.toLowerCase();
      for (let i = 0; i < voterizeList.length; i++) {
        const originalVoterize = voterizeList[i];
        if (originalVoterize.chamber === chamber) {
          if (lowerChamber === 'senate') {
            if (originalVoterize.state === state) {
              voterizeList[i].votesNeeded = newVotesNeeded;
            }
          } else {
            if (
              originalVoterize.state === state &&
              originalVoterize.district === district
            ) {
              voterizeList[i].votesNeeded = newVotesNeeded;
            }
          }
        }
      }
    }

    yield put(actions.updateVoterizeActionSuccess(voterizeList));
  } catch (error) {
    yield put(
      snackbarActions.showSnakbarAction('Error Updating Voterize', 'error'),
    );
  }
}

// Individual exports for testing
export default function* saga() {
  const candAction = yield takeLatest(types.LOAD_CANDIDATES, loadCandidates);
  yield takeLatest(types.LOAD_ALL_USERS, loadAllUsers);
  yield takeLatest(types.LOAD_ARTICLES_FEEDBACK, loadArticlesFeedback);

  yield takeLatest(types.DELETE_USER, deleteUser);
  const updateCandAction = yield takeLatest(
    types.UPDATE_CANDIDATE,
    updateCandidate,
  );
  const updateCandImageAction = yield takeLatest(
    types.UPDATE_CANDIDATE_IMAGE,
    updateCandidateImage,
  );

  const loadCandAction = yield takeLatest(types.LOAD_CANDIDATE, loadCandidate);

  yield takeLatest(types.LOAD_VOTERIZE, loadVoterizeList);
  yield takeLatest(types.UPDATE_VOTERIZE, updateVoterize);
  let action = yield takeLatest(types.DELETE_UPDATE, deleteUpdate);
}
