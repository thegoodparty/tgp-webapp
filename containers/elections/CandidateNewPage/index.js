/**
 *
 * CandidateNewPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidateNewWrapper from 'components/elections/CandidateNewWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import { getCandidateChamberDistrictOnly } from 'helpers/candidatesHelper';



import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import actions from '../CandidatePage/actions';


export function CandidateNewPage({ ssrState, dispatch }) {
  useInjectReducer({ key: 'candidateNewPage', reducer });
  useInjectSaga({ key: 'candidateNewPage', saga });

  let candidate;
  let tab;

  if (ssrState) {
    ({ candidate, tab } = ssrState);
    dispatch(actions.loadCandidateActionSuccess(candidate));
  }

  const emptyCandidate = () =>
    Object.keys(candidate).length === 0 && candidate.constructor === Object;

  const title = `${
    candidate && !emptyCandidate()
      ? `${candidate.firstName} ${candidate.lastName}`
      : ''
  } | ${candidate.chamber} ${
    candidate && !emptyCandidate() && candidate.isIncumbent
      ? 'incumbent'
      : 'candidate'
  }`;

  const url = typeof window !== 'undefined' ? window.location.href : '';

  const description = `${
    candidate && !emptyCandidate()
      ? `${candidate.firstName} ${candidate.lastName}`
      : ''
  } could win in ${getCandidateChamberDistrictOnly(
    candidate,
  )}, if we all just share this crowd-voting campaign! Add Your Vote & Share here: ${url}`;

  const childProps = {
    candidate,
  };
  return (
    <div>
      {candidate && !emptyCandidate() && (
        <TgpHelmet
          title={title}
          description={description}
          image={candidate?.image}
        />
      )}
      <CandidateNewWrapper {...childProps} />
    </div>
  );
}

CandidateNewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CandidateNewPage);
