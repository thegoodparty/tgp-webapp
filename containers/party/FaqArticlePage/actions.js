import types from './constants';

const sendArticleFeedbackAction = (id, title, isHelpful, feedback) => ({
  type: types.SEND_ARTICLE_FEEDBACK,
  id,
  title,
  isHelpful,
  feedback,
});

export default {
  sendArticleFeedbackAction,
};
