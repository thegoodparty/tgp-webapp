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
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import TopIssuesWrapper from '../../../components/candidate-portal/TopIssuesWrapper';
import TgpHelmet from '../../../components/shared/TgpHelmet';
import actions from './actions';

export function TopIssuesPage({
  userState,
  dispatch,
  candidatePortalHomePage,
  topIssuesPage,
  updateUgcCallback,
}) {
  useInjectReducer({ key: 'topIssuesPage', reducer });
  useInjectSaga({ key: 'topIssuesPage', saga });

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

  const { candidateUgc } = topIssuesPage;

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
      <TopIssuesWrapper {...childProps} />
    </div>
  );
}

TopIssuesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  topIssuesPage: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  updateUgcCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  topIssuesPage: makeSelectTopIssuesPage(),
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
)(TopIssuesPage);
