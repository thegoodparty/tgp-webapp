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
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';
import {
  candidateBlocName,
  candidateCalculatedFields,
  findBlocCandidate,
  generateEmptyBlocCandidate,
  isDistrictInCds,
} from 'helpers/electionsHelper';
import candidateReducer from 'containers/elections/CandidatePage/reducer';
import candidateSaga from 'containers/elections/CandidatePage/saga';
import makeSelectCandidate from 'containers/elections/CandidatePage/selectors';
import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';

import userActions from 'containers/you/YouPage/actions';

import queryHelper from 'helpers/queryHelper';
import {
  deleteSignupRedirectCookie,
  getSignupRedirectCookie,
  setSignupRedirectCookie,
} from 'helpers/cookieHelper';
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
  saveRankingCallback,
  refreshCountCallback,
  deleteCandidateRankingCallback,
  clearBlocCandidateCallback,
  clearJoinCandidateCallback,
  clearGrowCandidateCallback,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });
  useInjectSaga({ key: 'candidate', saga: candidateSaga });

  const [emptyBlocCandidate, setEmptyBlocCandidate] = useState(false);
  const [postRegisterCookie, setPostRegisterCookie] = useState(false);
  const [postRegisterJoin, setPostRegisterJoin] = useState(false);

  const { user, ranking } = userState;
  const { blocCandidate, joinCandidate, growCandidate } = districtState;
  const { incumbent } = candidateState;

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
      if (bloc.includes('GoodBloc')) {
        setEmptyBlocCandidate(
          generateEmptyBlocCandidate(district, chamber, state),
        );
        dispatch(push(pathname));
      } else {
        dispatch(districtActions.loadBlocCandidateAction(bloc));
        dispatch(push(pathname));
      }
    }

    const joinDeepLinkId = queryHelper(search, 'join');
    const joinDeepLinkName = queryHelper(search, 'name');
    if (joinDeepLinkId) {
      dispatch(
        districtActions.setJoinCandidateAction({
          id: parseInt(joinDeepLinkId, 10),
          name: joinDeepLinkName,
        }),
      );
      dispatch(push(pathname));
    }

    const growDeepLinkId = queryHelper(search, 'grow');
    if (growDeepLinkId) {
      dispatch(
        districtActions.setGrowCandidateAction({
          id: parseInt(growDeepLinkId, 10),
          name: joinDeepLinkName,
        }),
      );
      dispatch(push(pathname));
    }
  }, [candidates]);

  useEffect(() => {
    const cookieRedirect = getSignupRedirectCookie();
    if (cookieRedirect) {
      setPostRegisterCookie(cookieRedirect.options);
      // deleteSignupRedirectCookie();
    }
  }, [pathname, search]);

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

  const blocCandidateMatch =
    emptyBlocCandidate || findBlocCandidate(candidates, blocCandidate);
  let joinCandidateMatch;
  if (joinCandidate) {
    joinCandidateMatch = findBlocCandidate(candidates, joinCandidate);
  }

  let growCandidateMatch;
  if (growCandidate) {
    growCandidateMatch = findBlocCandidate(candidates, growCandidate);
  }

  let postRegisterCandidate;
  if (postRegisterCookie) {
    const { candidateId, name, rank } = postRegisterCookie;
    if (candidateId && name) {
      if (candidateId < 0) {
        postRegisterCandidate = generateEmptyBlocCandidate(
          district,
          chamber,
          state,
        );
      } else {
        postRegisterCandidate = findBlocCandidate(candidates, {
          id: candidateId,
          name,
        });
      }
      if (postRegisterCandidate) {
        setPostRegisterJoin({
          rank,
          candidate: postRegisterCandidate,
        });
        setPostRegisterCookie(false);
      }
    }
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
    saveRankingCallback,
    refreshCountCallback,
    deleteCandidateRankingCallback,
    blocCandidate: blocCandidateMatch,
    clearBlocCandidateCallback,
    joinCandidate: joinCandidateMatch,
    growCandidate: growCandidateMatch,
    clearJoinCandidateCallback,
    clearGrowCandidateCallback,
    postRegisterJoin,
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
  saveRankingCallback: PropTypes.func,
  refreshCountCallback: PropTypes.func,
  deleteCandidateRankingCallback: PropTypes.func,
  rankingObj: PropTypes.object,
  locationState: PropTypes.object,
  clearBlocCandidateCallback: PropTypes.func,
  clearJoinCandidateCallback: PropTypes.func,
  clearGrowCandidateCallback: PropTypes.func,
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
        deleteSignupRedirectCookie();
      } else {
        const route = `/elections/${chamber}${state ? `/${state}` : ''}${
          district ? `/${district}` : ''
        }`;
        const options = {
          candidateId: candidate.id,
          name: candidate.name,
          rank,
          blocName: candidateBlocName(candidate),
        };
        console.log('setting redirect cookie');
        setSignupRedirectCookie(route, options);
        // dispatch(userActions.saveGuestRankingAction(candidate, rank, chamber));
        dispatch(push('?register=true'));
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
    clearBlocCandidateCallback: () => {
      dispatch(districtActions.clearBlocCandidateAction());
    },
    clearJoinCandidateCallback: () => {
      dispatch(districtActions.clearJoinCandidateAction());
    },
    clearGrowCandidateCallback: () => {
      dispatch(districtActions.clearGrowCandidateAction());
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
