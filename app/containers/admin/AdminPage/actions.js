/*
 *
 * AdminPage actions
 *
 */

import types from './constants';

function loadCandidates(chamber) {
  return {
    type: types.LOAD_CANDIDATES,
    chamber,
  };
}

function loadCandidatesSuccess(candidates) {
  return {
    type: types.LOAD_CANDIDATES_SUCCESS,
    candidates,
  };
}

function loadCandidatesError(error) {
  return {
    type: types.LOAD_CANDIDATES_ERROR,
    error,
  };
}

function loadAllUsers() {
  return {
    type: types.LOAD_ALL_USERS,
  };
}

function loadAllUsersSuccess(users) {
  return {
    type: types.LOAD_ALL_USERS_SUCCESS,
    users,
  };
}

function loadAllUsersError(error) {
  return {
    type: types.LOAD_ALL_USERS_ERROR,
    error,
  };
}

function updateCandidate(id, updatedFields, chamber, isIncumbent) {
  return {
    type: types.UPDATE_CANDIDATE,
    id,
    updatedFields,
    chamber,
    isIncumbent,
  };
}

function updateCandidateSuccess(candidate) {
  return {
    type: types.UPDATE_CANDIDATE_SUCCESS,
    candidate,
  };
}

function loadArticlesFeedback() {
  return {
    type: types.LOAD_ARTICLES_FEEDBACK,
  };
}

function loadArticlesFeedbackSuccess(articlesFeedback) {
  return {
    type: types.LOAD_ARTICLES_FEEDBACK_SUCCESS,
    articlesFeedback,
  };
}

export default {
  loadCandidates,
  loadCandidatesSuccess,
  loadCandidatesError,

  loadAllUsers,
  loadAllUsersSuccess,
  loadAllUsersError,

  updateCandidate,
  updateCandidateSuccess,

  loadArticlesFeedback,
  loadArticlesFeedbackSuccess,
};
