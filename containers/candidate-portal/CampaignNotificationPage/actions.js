import types from './constants';

function findCampaignNotificationAction(id) {
  return {
    type: types.FIND_CAMPAIGN_NOTIFICATION,
    id,
  };
}

function findCampaignNotificationActionSuccess(campaignNotification) {
  return {
    type: types.FIND_CAMPAIGN_NOTIFICATION_SUCCESS,
    campaignNotification,
  };
}

function updateCampaignNotificationAction(campaignNotification, id) {
  return {
    type: types.UPDATE_CAMPAIGN_NOTIFICATION,
    campaignNotification,
    id,
  };
}

export default {
  findCampaignNotificationAction,
  findCampaignNotificationActionSuccess,
  updateCampaignNotificationAction,
};
