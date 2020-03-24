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
  CHAMBER_ENUM,
  defaultFilters,
  isCandidateGood,
  presidentialThreshold,
} from 'helpers/electionsHelper';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCandidate from './selectors';
import reducer from './reducer';
import saga from './saga';
import candidateActions from './actions';

export function CandidatePage({ id, chamber, candidateState, dispatch }) {
  useInjectReducer({ key: 'candidate', reducer });
  useInjectSaga({ key: 'candidate', saga });

  const { candidate, presidentialRank, incumbent } = candidateState;
  const filters = defaultFilters;
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
      dispatch(candidateActions.loadDistrictIncumbentAction(state, district));
    }
  }, [candidate]);

  let chamberEnum;
  if (chamberName === 'presidential') {
    chamberEnum = CHAMBER_ENUM.PRESIDENTIAL;
  } else if (chamberName === 'senate') {
    chamberEnum = CHAMBER_ENUM.SENATE;
  } else if (chamberName === 'house') {
    chamberEnum = CHAMBER_ENUM.HOUSE;
  } else {
    chamberEnum = CHAMBER_ENUM.PRESIDENTIAL;
  }
  const candidateWithFields = candidateCalculatedFields(candidate);
  let incumbentRaised;
  if (chamberName === 'presidential') {
    incumbentRaised = presidentialThreshold;
  } else {
    incumbentRaised = incumbent
      ? incumbent.raised || incumbent.combinedRaised
      : 1;
    incumbentRaised = incumbentRaised / 2;
  }

  const childProps = {
    candidate: candidateWithFields,
    chamberRank: presidentialRank,
    chamberName,
    isGood: isCandidateGood(candidate, filters, chamberEnum, incumbentRaised),
    incumbent,
  };

  return (
    <div>
      <Helmet>
        <title>
          {candidate ? candidate.name : ''} | {chamberName}{' '}
          {candidate && candidate.isIncumbent ? 'incumbent' : 'candidate'}
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
};

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
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
