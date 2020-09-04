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

function deleteUser(user) {
  return {
    type: types.DELETE_USER,
    user,
  };
}

function deleteUserSuccess(user) {
  return {
    type: types.DELETE_USER_SUCCESS,
    user,
  };
}

function updateCandidate(
  id,
  updatedFields,
  chamber,
  isIncumbent,
  isEdit = false,
) {
  return {
    type: types.UPDATE_CANDIDATE,
    id,
    updatedFields,
    chamber,
    isIncumbent,
    isEdit,
  };
}

function updateCandidateSuccess(candidate) {
  return {
    type: types.UPDATE_CANDIDATE_SUCCESS,
    candidate,
  };
}

function editCandidateSuccess(candidate) {
  return {
    type: types.EDIT_CANDIDATE_SUCCESS,
    candidate,
  };
}

function updateCandidateImage(base64, candidate, chamber) {
  return {
    type: types.UPDATE_CANDIDATE_IMAGE,
    base64,
    candidate,
    chamber,
  };
}

// function updateCandidateImageSuccess(candidate) {
//   return {
//     type: types.UPDATE_CANDIDATE_IMAGE_SUCCESS,
//     candidate,
//   };
// }

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

function loadCandidateAction(id, chamber, isIncumbent) {
  return {
    type: types.LOAD_CANDIDATE,
    id,
    chamber,
    isIncumbent,
  };
}

function loadCandidateActionSuccess(candidate) {
  return {
    type: types.LOAD_CANDIDATE_SUCCESS,
    candidate,
  };
}

function loadDivisions() {
  return {
    type: types.LOAD_DIVISIONS,
  };
}

function loadDivisionsSuccess(divisions) {
  return {
    type: types.LOAD_DIVISIONS_SUCCESS,
    divisions,
  };
}

function loadDivisionsError(error) {
  return {
    type: types.LOAD_DIVISIONS_ERROR,
    error,
  };
}

function updateDivision(division) {
  return {
    type: types.UPDATE_DIVISION,
    division,
  };
}

function updateDivisionSuccess(division) {
  return {
    type: types.UPDATE_DIVISION_SUCCESS,
    division,
  };
}

export default {
  loadCandidates,
  loadCandidatesSuccess,
  loadCandidatesError,

  loadAllUsers,
  loadAllUsersSuccess,
  loadAllUsersError,

  deleteUser,
  deleteUserSuccess,

  updateCandidate,
  updateCandidateSuccess,
  editCandidateSuccess,
  updateCandidateImage,

  loadArticlesFeedback,
  loadArticlesFeedbackSuccess,

  loadCandidateAction,
  loadCandidateActionSuccess,

  loadDivisions,
  loadDivisionsSuccess,
  loadDivisionsError,
  updateDivision,
  updateDivisionSuccess,
};
