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
import { makeSelectContent } from 'containers/App/selectors';
import { candidateBlocName, findBlocCandidate, isDistrictInCds } from 'helpers/electionsHelper';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';

import userActions from 'containers/you/YouPage/actions';
import { makeSelectLocation } from '../../App/selectors';
import queryHelper from '../../../helpers/queryHelper';

export function ElectionPage({
  content,
  chamber,
  state,
  district,
  districtState,
  candidateState,
  locationState,
  userState,
  rankingObj,
  dispatch,
  saveRankingCallback,
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

  const { user, ranking } = userState;
  const { blocCandidate } = districtState;

  let candidates;
  if (chamber === 'presidential') {
    candidates = districtState.presidential;
  } else if (chamber === 'senate') {
    candidates = districtState.senateCandidates;
  } else {
    candidates = districtState.houseCandidates;
  }
  const { search, pathname } = locationState;

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
    const bloc = queryHelper(search, 'b');
    if (bloc) {
      loadBlocCandidate(bloc);
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

  const loadBlocCandidate = bloc => {
    dispatch(districtActions.loadBlocCandidateAction(bloc));
    dispatch(push(pathname));
  };
  ``;

  const blocCandidateMatch = findBlocCandidate(candidates, blocCandidate);

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
    saveRankingCallback,
    refreshCountCallback,
    deleteCandidateRankingCallback,
    blocCandidate: blocCandidateMatch,
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
  refreshCountCallback: PropTypes.func,
  deleteCandidateRankingCallback: PropTypes.func,
  rankingObj: PropTypes.object,
  locationState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
  rankingObj: makeSelectRanking(),
  locationState: makeSelectLocation(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    chamber: ownProps.match.params.chamber,
    state: ownProps.match.params.state,
    district: ownProps.match.params.district,

    saveRankingCallback: (user, candidate, rank, chamber, state, district) => {
      if (user) {
        dispatch(
          userActions.saveUserRankingAction(
            candidate,
            rank,
            chamber,
            state,
            district,
          ),
        );
      } else {
        dispatch(userActions.saveGuestRankingAction(candidate, rank, chamber));
      }
    },
    deleteCandidateRankingCallback: (rank, user, chamber, state, district) => {
      if (user) {
        dispatch(
          userActions.deleteCandidateRankingAction(
            rank.id,
            chamber,
            state,
            district,
          ),
        );
      } else {
        dispatch(userActions.deleteGuestRankingAction(rank));
      }
    },

    refreshCountCallback: (state, district) => {
      // dispatch(districtActions.userCountsAction(state, district));
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
