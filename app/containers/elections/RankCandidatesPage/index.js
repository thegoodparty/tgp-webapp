/**
 *
 * RankCandidatesPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import saga from 'containers/intro/ZipFinderPage/saga';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import districtActions from 'containers/intro/ZipFinderPage/actions';
import candidateActions from 'containers/elections/CandidatePage/actions';
import userActions from 'containers/you/YouPage/actions';

import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import RankCandidatesWrapper from 'components/elections/RankCandidatesWrapper';
import makeSelectUser from '../../you/YouPage/selectors';
import {
  CHAMBER_ENUM,
  filterCandidates,
  getRankFromUserOrState,
} from '../../../helpers/electionsHelper';

export function RankCandidatesPage({
  districtState,
  candidateState,
  chamber,
  state,
  district,
  handleRankingCallback,
  saveRankingCallback,
  dispatch,
  userState,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });
  useInjectSaga({ key: 'candidate', saga: candidateSaga });

  let candidates;
  let chamberEnum = 0;

  const { filters } = districtState;
  const { user } = userState;

  let chamberRank;

  if (chamber === 'presidential') {
    candidates = districtState.presidential;
    chamberEnum = CHAMBER_ENUM.PRESIDENTIAL;
    chamberRank = getRankFromUserOrState(
      user,
      candidateState,
      'presidentialRank',
    );
  } else if (chamber === 'senate') {
    candidates = districtState.senateCandidates;
    chamberEnum = CHAMBER_ENUM.SENATE;
    chamberRank = getRankFromUserOrState(user, candidateState, 'senateRank');
  } else {
    candidates = districtState.houseCandidates;
    chamberEnum = CHAMBER_ENUM.HOUSE;
    chamberRank = getRankFromUserOrState(user, candidateState, 'houseRank');
  }

  useEffect(() => {
    if (!candidates) {
      if (chamber === 'presidential') {
        dispatch(districtActions.loadAllPresidentialAction());
      } else if (chamber === 'senate') {
        dispatch(districtActions.loadSenateCandidatesAction(state));
      } else {
        dispatch(districtActions.loadHouseCandidatesAction(state, district));
      }
    }
    if (!chamberRank) {
      dispatch(candidateActions.loadRankingFromCookieAction());
    }
  }, []);

  const filtered = filterCandidates(candidates, filters, chamberEnum);

  const childProps = {
    candidates: filtered,
    handleRankingCallback,
    saveRankingCallback,
    chamberRank,
    chamber,
    user,
  };

  return (
    <div>
      <Helmet>
        <title>Rank Presidential Candidates | The Good Party</title>
        <meta
          name="description"
          content="Rank Presidential Candidates | The Good Party"
        />
      </Helmet>
      <RankCandidatesWrapper {...childProps} />
    </div>
  );
}

RankCandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chamber: PropTypes.string.isRequired,
  state: PropTypes.string,
  district: PropTypes.string,
  districtState: PropTypes.object,
  candidateState: PropTypes.object,
  handleRankingCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    chamber: ownProps.match.params.chamber,
    state: ownProps.match.params.state,
    district: ownProps.match.params.district,
    handleRankingCallback: (rankingOrder, user, chamber) => {
      if (user) {
        dispatch(userActions.saveUserRankingAction(rankingOrder, chamber));
      } else {
        dispatch(push('/you/register'));
      }
    },
    saveRankingCallback: (rankingOrder, chamber) => {
      if (chamber === 'presidential') {
        dispatch(
          candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
        );
        dispatch(userActions.updatePresidentialRankAction(rankingOrder));
      } else if (chamber === 'senate') {
        dispatch(candidateActions.saveRankSenateCandidateAction(rankingOrder));
        dispatch(userActions.updateSenateRankAction(rankingOrder));
      } else if (chamber === 'house') {
        dispatch(candidateActions.saveRankHouseCandidateAction(rankingOrder));
        dispatch(userActions.updateHouseRankAction(rankingOrder));
      }
    },
  };
}

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RankCandidatesPage);
