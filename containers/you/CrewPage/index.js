/**
 *
 * CrewPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/you/YouPage/saga';
import reducer from 'containers/you/YouPage/reducer';
import userActions from 'containers/you/YouPage/actions';

import makeSelectUser from '../YouPage/selectors';

export function CrewPage({ userState, dispatch }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { user, crew, leaderboard, loading } = userState;
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : 'crew';

  const isLeaderboard = pathname.includes('leaderboard');
  console.log(pathname, isLeaderboard);
  useEffect(() => {
    if (user && !isLeaderboard && !crew) {
      dispatch(userActions.crewAction(false));
    }
    if (user && isLeaderboard && !leaderboard) {
      dispatch(userActions.leaderboardAction());
    }
  }, [user, isLeaderboard]);

  const childPros = {
    crew: isLeaderboard ? leaderboard : crew,
    tab: isLeaderboard ? 'leaderboard' : 'crew',
    loading,
    user,
  };
  return (
    <div>
      <Head>
        <title data-cy="page-title">Crew Page</title>
        <meta name="description" content="Crew Page." />
      </Head>
    </div>
  );
}

CrewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CrewPage);
