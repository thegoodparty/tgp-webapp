import types from './constants';

function findCampaignNotificationAction() {
  return {
    type: types.FIND_CAMPAIGN_NOTIFICATION,
  };
}

function findCampaignNotificationActionSuccess(campaignNotification) {
  return {
    type: types.FIND_CAMPAIGN_NOTIFICATION_SUCCESS,
    campaignNotification,
  };
}

function updateCampaignNotificationAction(campaignNotification) {
  return {
    type: types.UPDATE_CAMPAIGN_NOTIFICATION,
    campaignNotification,
  };
}

export default {
  findCampaignNotificationAction,
  findCampaignNotificationActionSuccess,
  updateCampaignNotificationAction,
};
