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
import Head from 'next/head';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router';

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

  const router = useRouter();
  const { chamberStateDistrict } = router.query;
  const chamber =
    chamberStateDistrict?.length > 0 ? chamberStateDistrict[0] : false;
  const state =
    chamberStateDistrict?.length > 1 ? chamberStateDistrict[1] : false;
  const district =
    chamberStateDistrict?.length > 2 ? chamberStateDistrict[2] : false;

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

  let displayChamber = '';
  if (chamber) {
    displayChamber = chamber.charAt(0).toUpperCase() + chamber.substring(1);
  }

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
      <Head>
        <title data-cy="page-title">
          {displayChamber} Election | The Good Party
        </title>
        <meta
          name="description"
          content={`${chamber} Election | The Good Party`}
        />
      </Head>
      <ElectionWrapper {...childProps} />
    </div>
  );
}

ElectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    deleteCandidateRankingCallback: (rank, user) => {
      if (user) {
        dispatch(userActions.deleteCandidateRankingAction(rank.id));
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
