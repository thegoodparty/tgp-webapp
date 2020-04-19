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
import { presidentialVotesThreshold } from '../../../helpers/electionsHelper';
import userActions from '../../you/YouPage/actions';

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
  saveRankingCallback,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });
  useInjectSaga({ key: 'candidate', saga: candidateSaga });

  const [chamberRank, setChamberRank] = useState([]);

  const { filters, userCounts } = districtState;
  const { user } = userState;

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
    dispatch(districtActions.userCountsAction(state, district));
  }, [state, district]);

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
      const userShortState = user.shortState;
      if (state !== userShortState) {
        rankingAllowed = false;
      }
    }
  } else if (chamber === 'house') {
    if (user) {
      const userDistrict = user.districtNumber + '';
      const userShortState = user.shortState;
      if (user.districtNumber === null) {
        // if district not set - take the first district in cds array.
        if (user.zipCode && user.zipCode.cds && user.zipCode.cds.length > 0) {
          if (
            state !== userShortState ||
            district !== user.zipCode.cds[0].code + ''
          ) {
            rankingAllowed = false;
          } else {
            rankingAllowed = true;
          }
        }
      } else if (state !== userShortState || district !== userDistrict) {
        rankingAllowed = false;
      }
    }
  }
  const displayChamber = chamber.charAt(0).toUpperCase() + chamber.substring(1);

  const childProps = {
    candidates: filtered,
    user,
    content,
    chamber,
    displayChamber,
    chamberRank,
    state,
    districtNumber: district,
    filters,
    rankingAllowed,
    userCounts,
    changeFiltersCallback,
    saveRankingCallback,
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
  candidateState: PropTypes.object,
  userState: PropTypes.object,
  changeFiltersCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
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

      const rankingLink =
        rankingOrder.length > 0 ? `ranked-${chamber}-election` : chamber;
      if (chamber === 'presidential') {
        dispatch(push(`/elections/${rankingLink}`));
      } else if (chamber === 'senate') {
        dispatch(push(`/elections/${rankingLink}/${state}`));
      } else if (chamber === 'house') {
        dispatch(push(`/elections/${rankingLink}/${state}/${district}`));
      }
    },
    saveRankingCallback: (user, rankingOrder, chamber, state, district) => {
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

      if (chamber === 'presidential') {
        dispatch(
          candidateActions.saveRankPresidentialCandidateAction(rankingOrder),
        );
      } else if (chamber === 'senate') {
        dispatch(
          candidateActions.saveRankSenateCandidateAction(rankingOrder, state),
        );
      } else if (chamber === 'house') {
        dispatch(
          candidateActions.saveRankHouseCandidateAction(
            rankingOrder,
            state,
            district,
          ),
        );
      }
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
