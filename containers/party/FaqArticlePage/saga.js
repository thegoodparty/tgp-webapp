import { all, call, takeLatest } from 'redux-saga/effects';
import requestHelper from 'helpers/requestHelper';
import { getUuid, getUserFromStateOrCookie } from 'helpers/userHelper';
import makeSelectUser from 'containers/you/YouPage/selectors';

import tgpApi from 'api/tgpApi';
import types from './constants';
import snackbarActions from '../../shared/SnackbarContainer/actions';

function* sendArticleFeedback(action) {
  try {
    const user = yield call(getUserFromStateOrCookie, makeSelectUser);
    const uuid = getUuid(user);
    const { id, title, isHelpful, feedback } = action;
    const api = tgpApi.articleFeedback;
    const payload = {
      id,
      title,
      isHelpful,
      feedback,
      uuid,
    };

    yield call(requestHelper, api, payload);
    snackbarActions.showSnakbarAction('Thank you for your feedback');
  } catch (error) {
    console.log(error);
    snackbarActions.showSnakbarAction('Error sending your feedback', 'error');
  }
}

// Individual exports for testing
export default function* saga() {
  yield all([takeLatest(types.SEND_ARTICLE_FEEDBACK, sendArticleFeedback)]);
}
