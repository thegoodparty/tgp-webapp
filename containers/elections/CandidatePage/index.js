/**
 *
 * CandidatePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import NotFoundPage from 'containers/shared/NotFoundPage/Loadable';
import CandidateWrapper from 'components/elections/CandidateWrapper';
import AdminMenuEditCandidate from 'components/admin/AdminMenu/AdminMenuEditCandidate/Loadable';
import { candidateCalculatedFields } from 'helpers/electionsHelper';
import { deleteSignupRedirectCookie } from 'helpers/cookieHelper';
import queryHelper from 'helpers/queryHelper';
import { getCandidateChamberDistrictOnly } from 'helpers/candidatesHelper';
import { uuidUrl } from 'helpers/userHelper';
import AnalyticsService from 'services/AnalyticsService';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';
import userActions from 'containers/you/YouPage/actions';
import TgpHelmet from 'components/shared/TgpHelmet';
import { makeSelectContent } from 'containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function CandidatePage({
  dispatch,
  userState,
  rankingObj,
  deleteCandidateRankingCallback,
  content,
  showRegisterCallback,
  saveRankingCallback,
  removeQueryCallback,
  trackShareCallback,
  ssrState,
}) {
  useInjectReducer({ key: 'candidate', reducer });
  useInjectSaga({ key: 'candidate', saga });

  let candidate;
  let chamber;
  let tab;
  let incumbent;
  if (ssrState) {
    ({ candidate, chamber, tab, incumbent } = ssrState);
    dispatch(actions.loadCandidateActionSuccess(candidate));
    if (incumbent) {
      dispatch(actions.loadDistrictIncumbentActionSuccess(incumbent));
    }
  }
  const [chamberName] = chamber ? chamber.split('-') : '';

  const queryAddVote =
    typeof window !== 'undefined'
      ? queryHelper(window.location.search, 'addVote')
      : false;
  const queryShare =
    typeof window !== 'undefined'
      ? queryHelper(window.location.search, 'share')
      : false;

  const candidateWithFields = candidateCalculatedFields(candidate);

  const { user, ranking } = userState;
  useEffect(() => {
    if (user && !ranking) {
      dispatch(userActions.userRankingAction());
    }
  }, [user]);
  if (!user && !ranking) {
    dispatch(userActions.guestRankingAction());
  }

  const routeTab = tab === 'info' ? 'info' : 'campaign';

  const childProps = {
    candidate: candidateWithFields,
    chamberRank: rankingObj[chamber],
    chamberName,
    incumbent,
    user,
    deleteCandidateRankingCallback,
    routeTab,
    content,
    showRegisterCallback,
    saveRankingCallback,
    queryAddVote,
    queryShare,
    removeQueryCallback,
    trackShareCallback,
  };

  const emptyCandidate = () =>
    Object.keys(candidate).length === 0 && candidate.constructor === Object;

  const title = `${
    candidate && !emptyCandidate() ? candidate.name : ''
  } | ${chamberName} ${
    candidate && !emptyCandidate() && candidate.isIncumbent
      ? 'incumbent'
      : 'candidate'
  }`;

  const url =
    typeof window !== 'undefined' ? uuidUrl(user, window.location.href) : '';

  const description = `${
    candidate && !emptyCandidate() ? candidate.name : ''
  } could win in ${getCandidateChamberDistrictOnly(
    candidate,
  )}, if we all just share this crowd-voting campaign! Add Your Vote & Share here: ${url}`;

  if (!candidate) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <TgpHelmet
        title={title}
        description={description}
        image={candidate?.image}
      />
      <CandidateWrapper {...childProps} />
      {user && user.isAdmin && <AdminMenuEditCandidate candidate={candidate} />}
    </div>
  );
}

CandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  chamber: PropTypes.string.isRequired,
  tab: PropTypes.string,
  userState: PropTypes.object,
  rankingObj: PropTypes.object,
  deleteCandidateRankingCallback: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showRegisterCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
  removeQueryCallback: PropTypes.func,
  trackShareCallback: PropTypes.func,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
  rankingObj: makeSelectRanking(),
  content: makeSelectContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteCandidateRankingCallback: rank => {
      dispatch(userActions.deleteCandidateRankingAction(rank.id));
    },
    showRegisterCallback: () => {
      dispatch(push('?register=true'));
    },
    saveRankingCallback: (user, candidate) => {
      AnalyticsService.sendEvent(
        'voting',
        'Join Candidate Bloc',
        candidate.name,
      );
      if (user) {
        const { chamber, state } = candidate;
        dispatch(
          userActions.saveUserRankingAction(
            candidate,
            chamber ? chamber.toLowerCase() : 'presidential',
            state,
          ),
        );
        deleteSignupRedirectCookie();
      }
    },
    removeQueryCallback: () => {
      dispatch(push(window.location.pathname));
    },
    trackShareCallback: candidate => {
      dispatch(actions.trackShare(candidate));
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
)(CandidatePage);
