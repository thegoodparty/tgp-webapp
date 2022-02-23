/**
 *
 * PortalEmbedButtonPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';
import { useRouter } from 'next/router';

import { getUserCookie } from '/helpers/cookieHelper';
import TgpHelmet from '/components/shared/TgpHelmet';
import PortalEmbedButtonWrapper from '/components/candidate-portal/PortalEmbedButtonWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectPortalEmbedButtonPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from '../StaffManagementPage/actions';
import { accessLevel } from '../CandidatePortalHomePage';

export function PortalEmbedButtonPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  ssrState,
}) {
  useInjectReducer({ key: 'portalEmbedButtonPage', reducer });
  useInjectSaga({ key: 'portalEmbedButtonPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const { content } = ssrState;
  const { candidate, role } = candidatePortalHomePage;
  const router = useRouter();
  const { id } = router.query;

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (user && id) {
      dispatch(portalHomeActions.findCandidate(id));
    }
  }, [user, id]);

  const childProps = {
    candidate,
    user,
    content,
    role,
  };

  const access = accessLevel(role);

  return (
    <div>
      <TgpHelmet title="Candidate Portal" description="Candidate Portal" />
      {access > 15 ? (
        <PortalEmbedButtonWrapper {...childProps} />
      ) : (
        <>Access Denied</>
      )}
    </div>
  );
}

PortalEmbedButtonPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
  portalEmbedButtonPage: makeSelectPortalEmbedButtonPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PortalEmbedButtonPage);
