import types from './constants';

const trackShare = (candidateId) => ({
  type: types.TRACK_SHARE,
  candidateId,
});

const trackVisitAction = (url, data) => ({
  type: types.TRACK_VISIT,
  url,
  data,
});

const claimAction = (name, email, phone, candidateId) => ({
  type: types.CLAIM,
  name,
  email,
  phone,
  candidateId,
});

const claimActionSuccess = () => ({
  type: types.CLAIM_SUCCESS,
});

export default {
  trackShare,
  // sendTopicFeedbackAction,
  //
  trackVisitAction,

  claimAction,
  claimActionSuccess,
};
