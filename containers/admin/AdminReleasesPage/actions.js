import types from './constants';

function createReleaseAction(release) {
  return {
    type: types.CREATE_RELEASE,
    release,
  };
}

function editReleaseAction(release) {
  return {
    type: types.EDIT_RELEASE,
    release,
  };
}

function deleteReleaseAction(id) {
  return {
    type: types.DELETE_RELEASE,
    id,
  };
}

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
function loadReleasesFeedbackAction() {
  return {
    type: types.LOAD_RELEASES_FEEDBACK,
  };
}

export default {
  createReleaseAction,
  editReleaseAction,
  deleteReleaseAction,
  loadReleasesAction,
  loadReleasesActionSuccess,
  loadReleasesFeedbackAction,
};
