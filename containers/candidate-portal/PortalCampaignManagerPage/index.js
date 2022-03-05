/**
 *
 * PortalCampaignManagerPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import { getUserCookie } from '/helpers/cookieHelper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectPortalCampaignManagerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import PortalCampaignManagerWrapper from '/components/candidate-portal/PortalCampaignManagerWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import actions from './actions';
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';

export function PortalCampaignManagerPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  portalCampaignManagerPage,
  updateUgcCallback,
  uploadImageCallback,
}) {
  useInjectReducer({ key: 'portalCampaignManagerPage', reducer });
  useInjectSaga({ key: 'portalCampaignManagerPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const router = useRouter();
  const { id } = router.query;

  const { candidate, role } = candidatePortalHomePage;

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
      dispatch(portalHomeActions.findCandidate(id));
      dispatch(actions.findUgcAction(id));
    }
  }, [id]);

  const { candidateUgc, loading, s3Url } = portalCampaignManagerPage;

  const access = accessLevel(role);

  const childProps = {
    candidate,
    user,
    candidateUgc,
    updateUgcCallback,
    role,
    uploadImageCallback,
    loading,
    s3Url,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign Manager - Candidate Portal"
        description="Campaign Manager - Candidate Portal"
      />
      {access > ACCESS_ENUM.STAFF ? (
        <PortalCampaignManagerWrapper {...childProps} />
      ) : (
        <>Access Denied</>
      )}
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
    updateUgcCallback: (id, ugc) => {
      dispatch(actions.updateUgcAction(id, ugc));
    },
    uploadImageCallback: (id, url) => {
      dispatch(actions.saveImageAction(id, url));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PortalCampaignManagerPage);
