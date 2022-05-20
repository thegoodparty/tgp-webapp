/*
 *
 * FeedbackContainer actions
 *
 */

import types from './constants';

function sendFeedbackAction(thumbs, suggestion) {
  return {
    type: types.SEND_FEEDBACK,
    thumbs,
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
