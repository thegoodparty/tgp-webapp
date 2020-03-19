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
  isCandidateGood,
} from 'helpers/electionsHelper';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCandidate from './selectors';
import reducer from './reducer';
import saga from './saga';
import candidateActions from './actions';

export function CandidatePage({
  id,
  chamber,
  candidateState,
  districtState,
  dispatch,
}) {
  useInjectReducer({ key: 'candidate', reducer });
  useInjectSaga({ key: 'candidate', saga });

  const { candidate, presidentialRank } = candidateState;
  const { filters } = districtState;

  const [chamberName, incumbent] = chamber.split('-');
  const isIncumbent = incumbent === 'i';

  useEffect(() => {
    if (id) {
      dispatch(
        candidateActions.loadCandidateAction(id, chamberName, isIncumbent),
      );
    }
    if (!presidentialRank) {
      dispatch(candidateActions.loadRankingFromCookieAction());
    }
  }, []);

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

  const childProps = {
    candidate: candidateWithFields,
    chamberRank: presidentialRank,
    chamberName,
    isGood: isCandidateGood(candidate, filters, chamberEnum),
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
  districtState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  districtState: makeSelectZipFinderPage(),
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
