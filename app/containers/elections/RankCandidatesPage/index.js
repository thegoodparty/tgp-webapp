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

  const [chamberRank, setChamberRank] = useState([]);

  let candidates;
  let chamberEnum = 0;
  if (chamber === 'presidential') {
    candidates = districtState.presidential;
    chamberEnum = CHAMBER_ENUM.PRESIDENTIAL;
  } else if (chamber === 'senate') {
    candidates = districtState.senateCandidates;
    chamberEnum = CHAMBER_ENUM.SENATE;
  } else {
    candidates = districtState.houseCandidates;
    chamberEnum = CHAMBER_ENUM.HOUSE;
  }

  const { filters } = districtState;
  const { user } = userState;

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

  useEffect(() => {
    let tempChamberRank;

    if (chamber === 'presidential') {
      candidates = districtState.presidential;
      chamberEnum = CHAMBER_ENUM.PRESIDENTIAL;
      tempChamberRank = getRankFromUserOrState(
        user,
        candidateState,
        'presidentialRank',
      );
    } else if (chamber === 'senate') {
      candidates = districtState.senateCandidates;
      chamberEnum = CHAMBER_ENUM.SENATE;
      tempChamberRank = getRankFromUserOrState(
        user,
        candidateState,
        'senateRank',
      );
      tempChamberRank = tempChamberRank ? tempChamberRank[state] : [];
    } else {
      candidates = districtState.houseCandidates;
      chamberEnum = CHAMBER_ENUM.HOUSE;
      tempChamberRank = getRankFromUserOrState(
        user,
        candidateState,
        'houseRank',
      );
      console.log('tempChamberRank before', tempChamberRank);
      tempChamberRank = tempChamberRank
        ? tempChamberRank[state + district]
        : [];
    }
    setChamberRank(tempChamberRank);
  }, [candidateState, user]);

  const filtered = filterCandidates(candidates, filters, chamberEnum);

  const childProps = {
    candidates: filtered,
    handleRankingCallback,
    saveRankingCallback,
    chamberRank,
    chamber,
    user,
    state,
    district,
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
    handleRankingCallback: (rankingOrder, user, chamber, state, district) => {
      if (user) {
        dispatch(
          userActions.saveUserRankingAction(
            rankingOrder,
            chamber,
            state,
            district,
          ),
        );
      }
      const rankingLink = rankingOrder.length > 0 ? 'ranked-' : '';
      if (chamber === 'presidential') {
        dispatch(push(`/elections/${rankingLink}presidential-election`));
      } else if (chamber === 'senate') {
        dispatch(push(`/elections/${rankingLink}senate-election/${state}`));
      } else if (chamber === 'house') {
        dispatch(
          push(`/elections/${rankingLink}house-election/${state}-${district}`),
        );
      }
    },
    saveRankingCallback: (rankingOrder, chamber, state, district) => {
      if (chamber === 'presidential') {
        dispatch(
          candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
        );
        dispatch(userActions.updatePresidentialRankAction(rankingOrder));
      } else if (chamber === 'senate') {
        dispatch(
          candidateActions.saveRankSenateCandidateAction(rankingOrder, state),
        );
        dispatch(userActions.updateSenateRankAction(rankingOrder, state));
      } else if (chamber === 'house') {
        dispatch(
          candidateActions.saveRankHouseCandidateAction(
            rankingOrder,
            state,
            district,
          ),
        );
        dispatch(
          userActions.updateHouseRankAction(rankingOrder, state, district),
        );
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
