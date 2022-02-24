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
import { useRouter } from 'next/router';

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
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';

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

  const router = useRouter();
  const { id } = router.query;

  const { candidate, role } = candidatePortalHomePage;

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
      dispatch(portalHomeActions.findCandidate(id));
      dispatch(actions.findCampaignNotificationAction(id));
    }
  }, [id]);

  const { campaignNotification } = campaignNotificationPage;

  const access = accessLevel(role);
  const childProps = {
    candidate,
    campaignNotification,
    updateCampaignNotificationCallback,
    role,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign Notification"
        description="Campaign Notification"
      />
      {access > ACCESS_ENUM.STAFF ? (
        <CampaignNotificationWrapper {...childProps} />
      ) : (
        <>Access Denied</>
      )}
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
    updateCampaignNotificationCallback: (notification, id) => {
      dispatch(actions.updateCampaignNotificationAction(notification, id));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CampaignNotificationPage);
