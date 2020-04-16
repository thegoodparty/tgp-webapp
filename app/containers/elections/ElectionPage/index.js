/**
 *
 * ElectionPage
 *
 */

/**
 *
 * ElectionPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import saga from 'containers/intro/ZipFinderPage/saga';

import districtActions from 'containers/intro/ZipFinderPage/actions';
import ElectionWrapper from 'components/elections/ElectionWrapper';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import { makeSelectContent } from 'containers/App/selectors';
import {
  CHAMBER_ENUM,
  filterCandidates,
  getRankFromUserOrState,
} from 'helpers/electionsHelper';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import candidateActions from 'containers/elections/CandidatePage/actions';
import makeSelectCandidate from '../CandidatePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

export function ElectionPage({
  content,
  chamber,
  state,
  district,
  districtState,
  candidateState,
  userState,
  dispatch,
  changeFiltersCallback,
  rankingLinkCallback,
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
      tempChamberRank = tempChamberRank
        ? tempChamberRank[state + district]
        : [];
    }
    setChamberRank(tempChamberRank);
  }, [candidateState, user]);

  const filtered = filterCandidates(candidates, filters, chamberEnum);

  let rankingAllowed = true;
  if (chamber === 'senate') {
    if (user) {
      userShortState = user.shortState;
      if (shortState !== userShortState) {
        rankingAllowed = false;
      }
    }
  } else if (chamber === 'house') {
    if (user) {
      const userDistrict = user.districtNumber + '';
      const userShortState = user.shortState;
      if (user.districtNumber === null) {
        rankingAllowed = true;
      } else if (state !== userShortState || district !== userDistrict) {
        rankingAllowed = false;
      }
    }
  }
  const displayChamber = chamber.charAt(0).toUpperCase() + chamber.substring(1);

  const childProps = {
    candidates: filtered,
    content,
    chamber,
    displayChamber,
    state,
    districtNumber: district,
    changeFiltersCallback,
    filters,
    rankingAllowed,
    rankingLinkCallback,
  };
  return (
    <div>
      <Helmet>
        <title>{displayChamber} Election | The Good Party</title>
        <meta
          name="description"
          content={`${chamber} Election | The Good Party`}
        />
      </Helmet>
      <ElectionWrapper {...childProps} />
    </div>
  );
}

ElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  chamber: PropTypes.string.isRequired,
  state: PropTypes.string,
  district: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  districtState: PropTypes.object,
  changeFiltersCallback: PropTypes.func,
  rankingLinkCallback: PropTypes.func,
  candidateState: PropTypes.object,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    chamber: ownProps.match.params.chamber,
    state: ownProps.match.params.state,
    district: ownProps.match.params.district,
    changeFiltersCallback: filters => {
      dispatch(districtActions.changeFiltersAction(filters));
    },
    rankingLinkCallback: link => {
      dispatch(push(link));
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
)(ElectionPage);
