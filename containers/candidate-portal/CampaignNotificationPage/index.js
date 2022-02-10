/**
 *
 * CampaignNotificationPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';
import CampaignNotificationWrapper from '/components/candidate-portal/CampaignNotificationWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getUserCookie } from '/helpers/cookieHelper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCampaignNotificationPage from './selectors';
import reducer from './reducer';
import saga from './saga';


import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

import actions from './actions';

export function CampaignNotificationPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  campaignNotificationPage,
  updateCampaignNotificationCallback,
}) {
  useInjectReducer({ key: 'campaignNotificationPage', reducer });
  useInjectSaga({ key: 'campaignNotificationPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const { candidate } = candidatePortalHomePage;

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }
  useEffect(() => {
    if (user) {
      if (!user.isAdmin && !user.candidate) {
        dispatch(push('/'));
      }
      dispatch(portalHomeActions.findCandidate());
      dispatch(actions.findCampaignNotificationAction());
    }
  }, [user]);

  const { campaignNotification } = campaignNotificationPage;
  const childProps = {
    user,
    candidate,
    campaignNotification,
    updateCampaignNotificationCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign Notification"
        description="Campaign Notification"
      />
      <CampaignNotificationWrapper {...childProps} />
    </div>
  );
}

CampaignNotificationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  campaignNotificationPage: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  updateCampaignNotificationCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  campaignNotificationPage: makeSelectCampaignNotificationPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateCampaignNotificationCallback: notification => {
      dispatch(actions.updateCampaignNotificationAction(notification));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CampaignNotificationPage);
