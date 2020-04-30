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
import makeSelectUser from '../../you/YouPage/selectors';

export function CandidatePage({
  id,
  chamber,
  candidateState,
  dispatch,
  userState,
}) {
  useInjectReducer({ key: 'candidate', reducer });
  useInjectSaga({ key: 'candidate', saga });

  const { candidate, presidentialRank, incumbent } = candidateState;
  const [chamberName, chamberIncumbent] = chamber.split('-');
  const isIncumbent = chamberIncumbent === 'i';

  const { state, district } = candidate || {};

  useEffect(() => {
    if (id) {
      dispatch(
        candidateActions.loadCandidateAction(id, chamberName, isIncumbent),
      );
    }
    if (!presidentialRank) {
      dispatch(candidateActions.loadRankingFromCookieAction());
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

  let chamberRank;
  const { user } = userState;
  if (chamberName === 'presidential') {
    chamberRank = getRankFromUserOrState(
      user,
      candidateState,
      'presidentialRank',
    );
  } else if (chamberName === 'senate') {
    chamberRank = getRankFromUserOrState(user, candidateState, 'senateRank');
    chamberRank = chamberRank ? chamberRank[state] : [];
  } else if (chamberName === 'house') {
    chamberRank = getRankFromUserOrState(user, candidateState, 'houseRank');
    chamberRank = chamberRank ? chamberRank[state + district] : [];
  }

  const childProps = {
    candidate: candidateWithFields,
    chamberRank,
    chamberName,
    incumbent,
    user,
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
};

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    id: ownProps.match.params.id,
    chamber: ownProps.match.params.chamber,
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
