import types from './constants';

function updateComparedCandidateAction(candidate) {
  return {
    type: types.UPDATE_COMPARED_CANDIDATES,
    candidate,
  };
}

export default {
  updateComparedCandidateAction,
};
