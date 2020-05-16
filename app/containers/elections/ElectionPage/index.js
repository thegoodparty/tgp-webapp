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

import React, { memo, useEffect } from 'react';
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
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';
import {
  getRankFromUserOrState,
  isDistrictInCds,
  rankingModeQuery,
} from 'helpers/electionsHelper';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';

import userActions from 'containers/you/YouPage/actions';
import queryHelper from 'helpers/queryHelper';

export function ElectionPage({
  content,
  chamber,
  state,
  district,
  districtState,
  candidateState,
  userState,
  locationState,
  rankingObj,
  dispatch,
  saveRankingCallback,
  editModeCallback,
  refreshCountCallback,
  deleteCandidateRankingCallback,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });
  useInjectSaga({ key: 'candidate', saga: candidateSaga });

  const { userCounts } = districtState;
  const { user, ranking } = userState;

  let candidates;
  if (chamber === 'presidential') {
    candidates = districtState.presidential;
  } else if (chamber === 'senate') {
    candidates = districtState.senateCandidates;
  } else {
    candidates = districtState.houseCandidates;
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
  }, []);

  useEffect(() => {
    if (user && !ranking) {
      dispatch(userActions.userRankingAction());
    }
  }, [user]);

  if (!user && !ranking) {
    dispatch(userActions.guestRankingAction());
  }

  useEffect(() => {
    dispatch(districtActions.userCountsAction(state, district));
  }, [state, district]);

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
            !isDistrictInCds(district, user.zipCode.cds)
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

  const { search, pathname } = locationState;
  const rankingMode = queryHelper(search, 'rankingMode') === 'true';

  // if there is no user, read the cookies ranking
  let countsWithCookies;
  if (!user) {
    countsWithCookies = {};
    countsWithCookies.threshold = userCounts.threshold;
    if (chamber === 'presidential') {
      const presidentialRank = getRankFromUserOrState(
        null,
        candidateState,
        'presidentialRank',
      );
      if (presidentialRank && presidentialRank.length > 0) {
        countsWithCookies.totalUsers = userCounts.totalUsers + 1;
      } else {
        countsWithCookies.totalUsers = userCounts.totalUsers;
      }
    }
    if (chamber === 'senate') {
      const senateRank = getRankFromUserOrState(
        null,
        candidateState,
        'senateRank',
      );
      if (senateRank && senateRank.length > 0) {
        countsWithCookies.senateUsers = userCounts.senateUsers + 1;
      } else {
        countsWithCookies.senateUsers = userCounts.senateUsers;
      }
    }

    if (chamber === 'house') {
      const houseRank = getRankFromUserOrState(
        null,
        candidateState,
        'houseRank',
      );
      if (houseRank && houseRank.length > 0) {
        countsWithCookies.districtUsers = userCounts.districtUsers + 1;
      } else {
        countsWithCookies.districtUsers = userCounts.districtUsers;
      }
    }
  }

  const childProps = {
    candidates,
    user,
    content,
    chamber,
    displayChamber,
    ranking: rankingObj[chamber],
    state,
    districtNumber: district,
    rankingAllowed,
    userCounts: countsWithCookies ? countsWithCookies : userCounts,
    saveRankingCallback,
    rankingMode,
    pathname,
    editModeCallback,
    refreshCountCallback,
    deleteCandidateRankingCallback,
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
  locationState: PropTypes.object,
  changeFiltersCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
  editModeCallback: PropTypes.func,
  refreshCountCallback: PropTypes.func,
  deleteCandidateRankingCallback: PropTypes.func,
  rankingObj: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
  locationState: makeSelectLocation(),
  rankingObj: makeSelectRanking(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    chamber: ownProps.match.params.chamber,
    state: ownProps.match.params.state,
    district: ownProps.match.params.district,

    saveRankingCallback: (user, candidate, rank, chamber, refreshUserCount) => {
      if (user) {
        dispatch(
          userActions.saveUserRankingAction(
            candidate,
            rank,
            chamber,
            refreshUserCount,
          ),
        );
      } else {
        dispatch(
          userActions.saveGuestRankingAction(
            candidate,
            rank,
            chamber,
            refreshUserCount,
          ),
        );
      }
    },
    deleteCandidateRankingCallback: (rank, user) => {
      if (user) {
        dispatch(userActions.deleteCandidateRankingAction(rank.id));
      } else {
        dispatch(userActions.deleteGuestRankingAction(rank));
      }
    },

    editModeCallback: pathname => {
      dispatch(push(pathname + rankingModeQuery));
    },

    refreshCountCallback: (state, district) => {
      dispatch(districtActions.userCountsAction(state, district));
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
