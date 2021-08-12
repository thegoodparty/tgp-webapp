import types from './constants';

function associateCandidateUserAction(candidateId, userEmail) {
  return {
    type: types.ASSOCIATE_CANDIDATE_USER,
    candidateId,
    userEmail,
  };
}

function findAssociatedUserAction(candidateId) {
  return {
    type: types.FIND_ASSOCIATED_USER,
    candidateId,
  };
}

function findAssociatedUserActionSuccess(user) {
  return {
    type: types.FIND_ASSOCIATED_USER_SUCCESS,
    user,
  };
}

function removeAssociatedUserAction(candidateId) {
  return {
    type: types.REMOVE_ASSOCIATED_USER,
    candidateId,
  };
}

export default {
  associateCandidateUserAction,

  findAssociatedUserAction,
  findAssociatedUserActionSuccess,

  removeAssociatedUserAction
};
