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

function toggleModalAction(isOpen) {
  return {
    type: types.TOGGLE_MODAL,
    isOpen,
  };
}

export default {
  sendFeedbackAction,
  toggleModalAction,
};
