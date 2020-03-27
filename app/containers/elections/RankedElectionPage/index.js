/**
 *
 * RankedElectionPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import saga from 'containers/intro/ZipFinderPage/saga';

import districtActions from 'containers/intro/ZipFinderPage/actions';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import {
  makeSelectLocation,
  makeSelectContent,
} from 'containers/App/selectors';
import {
  CHAMBER_ENUM,
  filterCandidates,
  getRankFromUserOrState,
} from 'helpers/electionsHelper';
import RankedElectionWrapper from 'components/elections/RankedElectionWrapper';
import globalActions from 'containers/App/actions';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import makeSelectUser from 'containers/you/YouPage/selectors';
import { presidentialVotesThreshold } from '../../../helpers/electionsHelper';

export function RankedElectionPage({
  districtState,
  search,
  content,
  dispatch,
  candidateState,
  userState,
  stateDistrict,
  shortState,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  const isPresidential = search.pathname.includes('presidential');
  const isSenate = search.pathname.includes('senate');
  const isHouse = search.pathname.includes('house');
  let districtNumber;
  let state;

  const { user } = userState;
  const { filters, userCounts, zipWithDistricts } = districtState;
  const [candidates, setCandidates] = useState({});
  let stateCandidates;
  let chamberEnum;
  let chamber;
  let rank;
  let votesNeeded = 100000;
  if (isPresidential) {
    stateCandidates = districtState.presidential;
    chamberEnum = CHAMBER_ENUM.PRESIDENTIAL;
    chamber = 'Presidential';
    rank = getRankFromUserOrState(user, candidateState, 'presidentialRank');
    votesNeeded = presidentialVotesThreshold;
  } else if (isSenate) {
    stateCandidates = districtState.senateCandidates;
    chamberEnum = CHAMBER_ENUM.SENATE;
    chamber = 'Senate';
    rank = getRankFromUserOrState(user, candidateState, 'senateRank');
    state = shortState;
    if (zipWithDistricts) {
      const { senateThresholds } = zipWithDistricts;
      if (senateThresholds) {
        votesNeeded =
          Math.max(
            senateThresholds.writeInThreshold,
            senateThresholds.writeInThresholdWithPresident,
          ) + 1;
      }
    }
  } else if (isHouse) {
    stateCandidates = districtState.houseCandidates;
    chamberEnum = CHAMBER_ENUM.HOUSE;
    chamber = 'House';
    rank = getRankFromUserOrState(user, candidateState, 'houseRank');
    [state, districtNumber] = stateDistrict.split('-');
    if (zipWithDistricts) {
      const { cds } = zipWithDistricts;
      if (cds && cds[0]) {
        votesNeeded =
          Math.max(
            cds[0].writeInThreshold,
            cds[0].writeInThresholdWithPresident,
          ) + 1;
      }
    }
  }

  useEffect(() => {
    if (!stateCandidates) {
      if (isPresidential) {
        dispatch(districtActions.loadAllPresidentialAction());
      } else if (isSenate) {
        dispatch(districtActions.loadSenateCandidatesAction(state));
      } else if (isHouse) {
        dispatch(
          districtActions.loadHouseCandidatesAction(state, districtNumber),
        );
      }
    }

    if (!content) {
      dispatch(globalActions.loadContentAction());
    }
  }, []);

  useEffect(() => {
    dispatch(districtActions.userCountsAction(shortState, districtNumber));
  }, [shortState, districtNumber]);

  useEffect(() => {
    const filtered = filterCandidates(
      stateCandidates || [],
      filters,
      chamberEnum,
    );
    setCandidates(filtered);
  }, [stateCandidates, filters]);

  const childProps = {
    candidates,
    chamber,
    content,
    userCounts,
    rank,
    votesNeeded,
  };
  return (
    <div>
      <Helmet>
        <title>RankedElectionPage</title>
        <meta name="description" content="Description of RankedElectionPage" />
      </Helmet>
      <RankedElectionWrapper {...childProps} />
    </div>
  );
}

RankedElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  districtState: PropTypes.object,
  search: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userState: PropTypes.object,
  candidateState: PropTypes.object,
  shortState: PropTypes.string,
  stateDistrict: PropTypes.string,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    stateDistrict: ownProps.match.params.stateDistrict,
    shortState: ownProps.match.params.shortState,
  };
}

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  search: makeSelectLocation(),
  content: makeSelectContent(),
  userState: makeSelectUser(),
  candidateState: makeSelectCandidate(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RankedElectionPage);
