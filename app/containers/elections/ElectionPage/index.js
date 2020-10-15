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

import React, { useEffect } from 'react';
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
import ElectionWrapper from 'components/elections/ElectionWrapper';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';
import { candidateCalculatedFields } from 'helpers/electionsHelper';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';

import userActions from 'containers/you/YouPage/actions';

import candidateActions from '../CandidatePage/actions';

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
  const { incumbent } = candidateState;

  let candidates;
  if (chamber === 'presidential') {
    candidates = districtState.presidential;
  } else if (chamber === 'senate') {
    candidates = districtState.senateCandidates;
  } else {
    candidates = districtState.houseCandidates;
  }
  const { pathname } = locationState;
  useEffect(() => {
    if (chamber === 'presidential') {
      dispatch(districtActions.loadAllPresidentialAction());
    } else if (chamber === 'senate') {
      dispatch(districtActions.loadSenateCandidatesAction(state));
    } else {
      dispatch(districtActions.loadHouseCandidatesAction(state, district));
    }
  }, [pathname]);

  useEffect(() => {
    if (user && !ranking) {
      dispatch(userActions.userRankingAction());
    }
  }, [user]);

  // loading district incumbent
  useEffect(() => {
    if (chamber === 'Senate') {
      dispatch(candidateActions.loadDistrictIncumbentAction(state));
    } else {
      dispatch(candidateActions.loadDistrictIncumbentAction(state, district));
    }
  }, [candidates]);

  if (!user && !ranking) {
    dispatch(userActions.guestRankingAction());
  }

  const displayChamber = chamber.charAt(0).toUpperCase() + chamber.substring(1);

  const candidatesWithFields = candidates;

  if (candidates) {
    const { good, notGood, unknown } = candidates;
    const goodWithFields = good.map(candidate =>
      candidateCalculatedFields(candidate),
    );
    const notGoodWithFields = notGood.map(candidate =>
      candidateCalculatedFields(candidate),
    );
    const unknownWithFields = unknown.map(candidate =>
      candidateCalculatedFields(candidate),
    );
    candidatesWithFields.good = goodWithFields;
    candidatesWithFields.notGood = notGoodWithFields;
    candidatesWithFields.unknown = unknownWithFields;
  }

  const childProps = {
    candidates: candidatesWithFields,
    user,
    content,
    chamber,
    displayChamber,
    ranking: rankingObj[chamber],
    state,
    districtNumber: district,

    deleteCandidateRankingCallback,

    incumbent,
  };

  return (
    <div>
      <Helmet>
        <title data-cy="page-title">
          {displayChamber} Election | The Good Party
        </title>
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ElectionPage);
