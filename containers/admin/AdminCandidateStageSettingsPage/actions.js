import types from './constants';

function updateCandidateAction(candidate) {
  return {
    type: types.UPDATE_CANDIDATE,
    candidate,
  };
}

export default {
  updateCandidateAction,
};
