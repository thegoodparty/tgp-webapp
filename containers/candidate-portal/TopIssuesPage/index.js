/**
 *
 * TopIssuesPage
 *
 */

import React, { memo, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import TopIssuesWrapper from '/components/candidate-portal/TopIssuesWrapper';
import TgpHelmet from '/components/shared/TgpHelmet';
import { getUserCookie } from '/helpers/cookieHelper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectTopIssuesPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import makeSelectAdminTopIssuesPage from '../../admin/AdminTopIssuesPage/selectors';

import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

import actions from './actions';
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';

export const TopIssuesPageContext = createContext();

export function TopIssuesPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  topIssuesPage,
  saveIssueCallback,
  updateIssueCallback,
  deleteCandidatePositionCallback,
}) {
  useInjectReducer({ key: 'topIssuesPage', reducer });
  useInjectSaga({ key: 'topIssuesPage', saga });

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
    }
  }, [id]);

  useEffect(() => {
    dispatch(actions.loadTopIssuesAction());
    if (user && id) {
      dispatch(portalHomeActions.findCandidate(id));
      dispatch(actions.findCandidatePositionsAction(id));
    }
  }, [user]);

  const { candidatePositions, topIssues } = topIssuesPage;
  console.log('topIssues', topIssues);
  const childProps = {
    user,
    candidate,
    candidatePositions,
    saveIssueCallback,
    updateIssueCallback,
    deleteCandidatePositionCallback,
    topIssues,
    role,
  };

  const access = accessLevel(role);

  return (
    <TopIssuesPageContext.Provider value={childProps}>
      <TgpHelmet
        title="Campaign Manager - Top Issues"
        description="Campaign Manager - Top Issues"
      />
      {access > ACCESS_ENUM.STAFF ? <TopIssuesWrapper /> : <>Access Denied</>}
    </TopIssuesPageContext.Provider>
  );
}

TopIssuesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  topIssuesPage: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  saveIssueCallback: PropTypes.func,
  updateIssueCallback: PropTypes.func,
  deleteCandidatePositionCallback: PropTypes.func,
  adminTopIssuesPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  topIssuesPage: makeSelectTopIssuesPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  adminTopIssuesPage: makeSelectAdminTopIssuesPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveIssueCallback: (
      topIssueId,
      positionId,
      description,
      candidateId,
      order,
    ) => {
      dispatch(
        actions.saveCandidatePositionAction(
          topIssueId,
          positionId,
          description,
          candidateId,
          order,
        ),
      );
    },
    updateIssueCallback: (
      id,
      topIssueId,
      positionId,
      description,
      candidateId,
    ) => {
      dispatch(
        actions.updateCandidatePositionAction(
          id,
          topIssueId,
          positionId,
          description,
          candidateId,
        ),
      );
    },
    deleteCandidatePositionCallback: (id, candidateId) => {
      dispatch(actions.deleteCandidatePositionAction(id, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TopIssuesPage);
