import { call, put, takeLatest, select } from 'redux-saga/effects';

import requestHelper from '/helpers/requestHelper';
import tgpApi from '/api/tgpApi';
import snackbarActions from '/containers/shared/SnackbarContainer/actions';
import types from './constants';
import actions from './actions';

function* findCampaignNotification({ id }) {
  try {
    const api = tgpApi.campaign.notification.find;
    const payload = {
      id,
    };
    const { campaignNotification } = yield call(requestHelper, api, payload);
    yield put(
      actions.findCampaignNotificationActionSuccess(campaignNotification),
    );
  } catch (error) {
    console.log(error);
  }
}

function* updateCampaignNotification({ campaignNotification, id }) {
  try {
    yield put(snackbarActions.showSnakbarAction('Saving...'));
    const api = tgpApi.campaign.notification.update;
    const payload = {
      data: campaignNotification,
      id,
    };
    yield call(requestHelper, api, payload);
    yield put(actions.findCampaignNotificationAction(id));
    yield put(snackbarActions.showSnakbarAction('Your request was sent'));
  } catch (error) {
    console.log(error);
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(types.FIND_CAMPAIGN_NOTIFICATION, findCampaignNotification);
  yield takeLatest(
    types.UPDATE_CAMPAIGN_NOTIFICATION,
    updateCampaignNotification,
  );
}
