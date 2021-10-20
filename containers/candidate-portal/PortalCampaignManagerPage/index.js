/**
 *
 * PortalCampaignManagerPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import { getUserCookie } from 'helpers/cookieHelper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPortalCampaignManagerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import PortalCampaignManagerWrapper from '../../../components/candidate-portal/PortalCampaignManagerWrapper';
import TgpHelmet from '../../../components/shared/TgpHelmet';
import actions from './actions';

export function PortalCampaignManagerPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  portalCampaignManagerPage,
  updateUgcCallback,
}) {
  useInjectReducer({ key: 'portalCampaignManagerPage', reducer });
  useInjectSaga({ key: 'portalCampaignManagerPage', saga });

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
      dispatch(actions.findUgcAction());
    }
  }, [user]);

  const { candidateUgc } = portalCampaignManagerPage;

  const childProps = {
    candidate,
    user,
    candidateUgc,
    updateUgcCallback,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign Manager - Candidate Portal"
        description="Campaign Manager - Candidate Portal"
      />
      <PortalCampaignManagerWrapper {...childProps} />
    </div>
  );
}

PortalCampaignManagerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  portalCampaignManagerPage: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  updateUgcCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  portalCampaignManagerPage: makeSelectPortalCampaignManagerPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateUgcCallback: ugc => {
      dispatch(actions.updateUgcAction(ugc));
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
)(PortalCampaignManagerPage);
