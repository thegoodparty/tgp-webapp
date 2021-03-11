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

export default {
  loadCrewPreviewAction,
  loadCrewPreviewActionSuccess,
};
