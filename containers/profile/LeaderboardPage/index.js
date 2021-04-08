/**
 *
 * LeaderboardPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LeaderboardWrapper from 'components/profile/LeaderboardWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import { getUserCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLeaderboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function LeaderboardPage({ leaderboardPage, dispatch }) {
  useInjectReducer({ key: 'leaderboardPage', reducer });
  useInjectSaga({ key: 'leaderboardPage', saga });
  const { crew, leaderboard } = leaderboardPage;
  useEffect(() => {
    if (!crew) {
      dispatch(actions.loadCrewAction());
    }
  }, [crew]);

  useEffect(() => {
    if (!leaderboard) {
      dispatch(actions.loadLeaderboradAction());
    }
  }, [leaderboard]);

  const user = getUserCookie(true);

  const childProps = {
    crew,
    user,
    leaderboard,
  };
  console.log('leaderboard', leaderboard);
  return (
    <div>
      <TgpHelmet
        title="Leaderboard | GOOD PARTY"
        ogTitle="See where you rank in recruiting GOOD PARTY people."
        description="Invite people and move up the leaderboard when they join."
      />
      <LeaderboardWrapper {...childProps} />
    </div>
  );
}

LeaderboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  leaderboardPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  leaderboardPage: makeSelectLeaderboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LeaderboardPage);
