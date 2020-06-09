/**
 *
 * CandidatePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import CandidateWrapper from 'components/elections/CandidateWrapper';
import {
  candidateCalculatedFields,
  getRankFromUserOrState,
} from 'helpers/electionsHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCandidate from './selectors';
import reducer from './reducer';
import saga from './saga';
import candidateActions from './actions';
import makeSelectUser, { makeSelectRanking } from '../../you/YouPage/selectors';
import userActions from '../../you/YouPage/actions';

export function CandidatePage({
  id,
  chamber,
  candidateState,
  dispatch,
  userState,
  rankingObj,
  deleteCandidateRankingCallback,
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

  const childProps = {
    candidate: candidateWithFields,
    chamberRank: rankingObj[chamber],
    chamberName,
    incumbent,
    user,
    deleteCandidateRankingCallback,
  };

  const emptyCandidate = () => {
    return (
      Object.keys(candidate).length === 0 && candidate.constructor === Object
    );
  };

  return (
    <div>
      <Helmet>
        <title>
          {candidate && !emptyCandidate() ? candidate.name : ''} | {chamberName}{' '}
          {candidate && !emptyCandidate() && candidate.isIncumbent
            ? 'incumbent'
            : 'candidate'}
        </title>
        <meta
          name="description"
          content={`${candidate ? candidate.name : ''} | ${chamberName} ${
            candidate && candidate.isIncumbent ? 'incumbent' : 'candidate'
          }`}
        />
      </Helmet>
      <CandidateWrapper {...childProps} />
    </div>
  );
}

CandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  chamber: PropTypes.string.isRequired,
  candidateState: PropTypes.object,
  userState: PropTypes.object,
  rankingObj: PropTypes.object,
  deleteCandidateRankingCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
  rankingObj: makeSelectRanking(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    id: ownProps.match.params.id,
    chamber: ownProps.match.params.chamber,
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

export default compose(
  withConnect,
  memo,
)(CandidatePage);
