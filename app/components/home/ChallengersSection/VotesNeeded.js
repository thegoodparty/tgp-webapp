import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body13 } from 'components/shared/typogrophy';
import { candidateCalculatedFields } from 'helpers/electionsHelper';
import { numberFormatter } from 'helpers/numberHelper';

const PercWrapper = styled(Body13)`
  font-weight: 700;
  display: inline-block;
  color: ${props => props.theme.colors.green};
`;

const VotesNeeded = ({ candidate }) => {
  const calculatedChallanger = candidateCalculatedFields(candidate);
  const {
    state,
    district,
    likelyVoters,
    votesNeeded,
    chamber,
  } = calculatedChallanger;
  let districtInfo = '';
  if (state) {
    districtInfo = `${state.toUpperCase()}${
      chamber === 'House' && district ? `-${district}` : ' Senate'
    }`;
  }

  const neededPercent =
    votesNeeded && votesNeeded !== 0
      ? parseInt((likelyVoters * 100) / votesNeeded, 10)
      : 0;

  return (
    <>
      <PercWrapper>{neededPercent}%</PercWrapper> of {'  '}
      {numberFormatter(votesNeeded)} votes needed to win
    </>
  );
};

VotesNeeded.propTypes = {
  candidate: PropTypes.object,
};

export default VotesNeeded;
