/**
 *
 * TopIssuesPage
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
import makeSelectTopIssuesPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import makeSelectAdminIssueTopicsPage from '../../admin/AdminIssueTopicsPage/selectors';

import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import TopIssuesWrapper from '../../../components/candidate-portal/TopIssuesWrapper';
import TgpHelmet from '../../../components/shared/TgpHelmet';
import actions from './actions';
import adminIssueTopicsPageReducer from '../../admin/AdminIssueTopicsPage/reducer';
import adminIssueTopicsSaga from '../../admin/AdminIssueTopicsPage/saga';
import adminIssueTopicsActions from '../../admin/AdminIssueTopicsPage/actions';

export function TopIssuesPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  topIssuesPage,
  updateIssueCallback,
  adminIssueTopicsPage,
}) {
  useInjectReducer({ key: 'topIssuesPage', reducer });
  useInjectSaga({ key: 'topIssuesPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  useInjectReducer({
    key: 'adminIssueTopicsPage',
    reducer: adminIssueTopicsPageReducer,
  });
  useInjectSaga({ key: 'adminIssueTopicsPage', saga: adminIssueTopicsSaga });

  const { candidate } = candidatePortalHomePage;

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }
  useEffect(() => {
    dispatch(adminIssueTopicsActions.loadIssueTopicsAction());
    if (user) {
      if (!user.isAdmin && !user.candidate) {
        dispatch(push('/'));
      }
      dispatch(portalHomeActions.findCandidate());
      dispatch(actions.findIssueAction());
    }
  }, [user]);

  const { candidateIssue } = topIssuesPage;
  const { topics } = adminIssueTopicsPage;
  const childProps = {
    user,
    candidate,
    candidateIssue,
    updateIssueCallback,
    topics,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign Manager - Top Issues"
        description="Campaign Manager - Top Issues"
      />
      <TopIssuesWrapper {...childProps} />
    </div>
  );
}

TopIssuesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  topIssuesPage: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  updateIssueCallback: PropTypes.func,
  adminIssueTopicsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  topIssuesPage: makeSelectTopIssuesPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  adminIssueTopicsPage: makeSelectAdminIssueTopicsPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateIssueCallback: issue => {
      dispatch(actions.updateIssueAction(issue));
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
)(TopIssuesPage);
