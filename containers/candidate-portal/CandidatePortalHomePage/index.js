/**
 *
 * CandidatePortalHomePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from '/components/shared/TgpHelmet';
import CandidatePortalHomeWrapper from '/components/candidate-portal/CandidatePortalHomeWrapper';
import { getUserCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCandidatePortalHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export function CandidatePortalHomePage({
  userState,
  dispatch,
  candidatePortalHomePage,
  loadStatsCallback,
}) {
  useInjectReducer({ key: 'candidatePortalHomePage', reducer });
  useInjectSaga({ key: 'candidatePortalHomePage', saga });
  const { candidate, stats } = candidatePortalHomePage;
  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }
  useEffect(() => {
    if (user) {
      if (!user.isAdmin && !user.candidate) {
        dispatch(push('/'));
      }
      dispatch(actions.findCandidate());
      if (!stats) {
        dispatch(actions.loadStatsAction('Last Week'));
      }
    }
  }, [user]);

  const childProps = {
    candidate,
    user,
    stats,
    loadStatsCallback,
  };

  return (
    <div>
      <TgpHelmet title="Candidate Portal" description="Candidate Portal" />
      {user && <CandidatePortalHomeWrapper {...childProps} />}
    </div>
  );
}

CandidatePortalHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  loadStatsCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadStatsCallback: range => {
      dispatch(actions.loadStatsAction(range));
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
)(CandidatePortalHomePage);
