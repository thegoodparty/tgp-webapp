import types from './constants';

function loadReleasesAction() {
  return {
    type: types.LOAD_RELEASES,
  };
}

function loadReleasesActionSuccess(releases) {
  return {
    type: types.LOAD_RELEASES_SUCCESS,
    releases,
  };
}

export default {
  loadReleasesAction,
  loadReleasesActionSuccess,
};
