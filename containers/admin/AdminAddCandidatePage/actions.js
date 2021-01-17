/*
 *
 * AdminAddCandidatePage actions
 *
 */

import types from './constants';

function createCandidateAction(candidate) {
  return {
    type: types.CREATE_CANDIDATE,
    candidate,
  };
}

export default {
  createCandidateAction,
};
