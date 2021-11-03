/*
 *
 * FeedbackContainer actions
 *
 */

import types from './constants';

function sendFeedbackAction(stars, feedbackType, suggestion) {
  return {
    type: types.SEND_FEEDBACK,
    stars,
    feedbackType,
    suggestion,
  };
}

export default {
  sendFeedbackAction,
};
