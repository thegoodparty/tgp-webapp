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
import { push } from 'connected-react-router';

import NotFoundPage from 'containers/shared/NotFoundPage/Loadable';
import CandidateWrapper from 'components/elections/CandidateWrapper';
import AdminMenuEditCandidate from 'components/admin/AdminMenu/AdminMenuEditCandidate/Loadable';
import { candidateCalculatedFields } from 'helpers/electionsHelper';
import { deleteSignupRedirectCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectUser, {
  makeSelectRanking,
} from 'containers/you/YouPage/selectors';
import userActions from 'containers/you/YouPage/actions';
import TgpHelmet from 'components/shared/TgpHelmet';
import { makeSelectContent } from 'containers/App/selectors';
import makeSelectCandidate from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import queryHelper from '../../../helpers/queryHelper';

export function CandidatePage({
  id,
  chamber,
  tab,
  candidateState,
  dispatch,
  userState,
  rankingObj,
  deleteCandidateRankingCallback,
  content,
  showRegisterCallback,
  saveRankingCallback,
  removeQueryCallback,
  trackShareCallback,
}) {
  useInjectReducer({ key: 'candidate', reducer });
  useInjectSaga({ key: 'candidate', saga });

  const { candidate, incumbent, loading, error } = candidateState;
  const [chamberName, chamberIncumbent] = chamber.split('-');
  const isIncumbent = chamberIncumbent === 'i';

  const { state, district } = candidate || {};
  const queryAddVote = queryHelper(window.location.search, 'addVote');
  const queryShare = queryHelper(window.location.search, 'share');

  useEffect(() => {
    if (id) {
      dispatch(actions.loadCandidateAction(id, chamberName, isIncumbent));
    }
  }, [id, chamber]);

  useEffect(() => {
    if (!isIncumbent) {
      if (candidate?.chamber === 'Senate') {
        dispatch(actions.loadDistrictIncumbentAction(state));
      } else {
        dispatch(actions.loadDistrictIncumbentAction(state, district));
      }
    }
  }, [candidate]);

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
  if (!candidate && error && !loading) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <TgpHelmet title={title} description={title} image={candidate?.image} />
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
  candidateState: PropTypes.object,
  userState: PropTypes.object,
  rankingObj: PropTypes.object,
  deleteCandidateRankingCallback: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showRegisterCallback: PropTypes.func,
  saveRankingCallback: PropTypes.func,
  removeQueryCallback: PropTypes.func,
  trackShareCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
  rankingObj: makeSelectRanking(),
  content: makeSelectContent(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    id: ownProps.match.params.id,
    chamber: ownProps.match.params.chamber,
    tab: ownProps.match.params.tab,
    deleteCandidateRankingCallback: rank => {
      dispatch(userActions.deleteCandidateRankingAction(rank.id));
    },
    showRegisterCallback: () => {
      dispatch(push('?register=true'));
    },
    saveRankingCallback: (user, candidate) => {
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
