import types from './constants';

const setPositionsAction = (positions) => ({
  type: types.SET_POSITIONS,
  positions,
});

const setCandidatesAction = (candidates) => ({
  type: types.SET_CANDIDATES,
  candidates,
});

export default {
  setPositionsAction,
  setCandidatesAction,
};
