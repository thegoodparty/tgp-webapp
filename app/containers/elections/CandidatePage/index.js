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
import candidateActions from './actions';

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
}) {
  useInjectReducer({ key: 'candidate', reducer });
  useInjectSaga({ key: 'candidate', saga });

  const { candidate, incumbent } = candidateState;
  const [chamberName, chamberIncumbent] = chamber.split('-');
  const isIncumbent = chamberIncumbent === 'i';

  const { state, district } = candidate || {};

  useEffect(() => {
    if (id) {
      dispatch(
        candidateActions.loadCandidateAction(id, chamberName, isIncumbent),
      );
    }
  }, [id, chamber]);

  useEffect(() => {
    if (!isIncumbent) {
      if (candidate.chamber === 'Senate') {
        dispatch(candidateActions.loadDistrictIncumbentAction(state));
      } else {
        dispatch(candidateActions.loadDistrictIncumbentAction(state, district));
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
    deleteCandidateRankingCallback: (rank, user) => {
      if (user) {
        dispatch(userActions.deleteCandidateRankingAction(rank.id));
      } else {
        dispatch(userActions.deleteGuestRankingAction(rank));
      }
    },
    showRegisterCallback: () => {
      dispatch(push('?register=true'));
    },
    saveRankingCallback: (user, candidate, rank) => {
      if (user) {
        const { chamber, state, district } = candidate;
        console.log('here', chamber, state, district);
        dispatch(
          userActions.saveUserRankingAction(
            candidate,
            rank,
            chamber.toLowerCase(),
            state,
            district,
          ),
        );
        deleteSignupRedirectCookie();
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
)(CandidatePage);
