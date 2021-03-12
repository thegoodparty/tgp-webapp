/*
 *
 * ProfilePage actions
 *
 */

import types from './constants';

const loadCrewPreviewAction = () => ({
  type: types.LOAD_CREW_PREVIEW,
});

const loadCrewPreviewActionSuccess = (crewPreview, crewCount) => ({
  type: types.LOAD_CREW_PREVIEW_SUCCESS,
  crewPreview,
  crewCount,
});

const loadUserSupportedAction = () => ({
  type: types.LOAD_USER_SUPPORTED,
});

const loadUserSupportedActionSuccess = (userSupported) => ({
  type: types.LOAD_USER_SUPPORTED_SUCCESS,
  userSupported
});

export default {
  loadCrewPreviewAction,
  loadCrewPreviewActionSuccess,

  loadUserSupportedAction,
  loadUserSupportedActionSuccess,
};
