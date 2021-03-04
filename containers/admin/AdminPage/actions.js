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
  updates,
) {
  return {
    type: types.UPDATE_CANDIDATE,
    id,
    updatedFields,
    chamber,
    isIncumbent,
    isEdit,
    updates,
  };
}

function deleteUpdate(candidateId, chamber, isIncumbent, updateId) {
  return {
    type: types.DELETE_UPDATE,
    candidateId,
    chamber,
    isIncumbent,
    updateId,
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

function loadVoterizeAction() {
  return {
    type: types.LOAD_VOTERIZE,
  };
}

function loadVoterizeActionSuccess(voterize) {
  return {
    type: types.LOAD_VOTERIZE_SUCCESS,
    voterize,
  };
}

function loadVoterizeActionError(error) {
  return {
    type: types.LOAD_VOTERIZE_ERROR,
    error,
  };
}

function updateVoterizeAction(voterize) {
  return {
    type: types.UPDATE_VOTERIZE,
    voterize,
  };
}

function updateVoterizeActionSuccess(voterize) {
  return {
    type: types.UPDATE_VOTERIZE_SUCCESS,
    voterize,
  };
}

function deleteCandidateAction(id) {
  return {
    type: types.DELETE_CANDIDATE,
    id,
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

  loadVoterizeAction,
  loadVoterizeActionSuccess,
  loadVoterizeActionError,
  updateVoterizeAction,
  updateVoterizeActionSuccess,

  deleteUpdate,
  deleteCandidateAction,
};
