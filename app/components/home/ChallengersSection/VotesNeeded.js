import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body } from 'components/shared/typogrophy';
import { candidateCalculatedFields } from 'helpers/electionsHelper';
import { numberFormatter } from 'helpers/numberHelper';

const OneLine = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PercWrapper = styled(Body)`
  font-weight: 700;
  display: inline-block;
  color: ${props => props.theme.colors.green};
`;
const DistrictInfo = styled.span`
  &.truncate-small {
    display: none;
    text-align: center;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: inline;
    }
  }
`;

const VotesNeeded = ({ candidate, truncateSmall = false }) => {
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
    <OneLine>
      <PercWrapper>{neededPercent}%</PercWrapper> of {'  '}
      {numberFormatter(votesNeeded)} votes needed to win
      <DistrictInfo className={truncateSmall ? 'truncate-small' : ''}>
        {' '}
        {districtInfo}
      </DistrictInfo>
    </OneLine>
  );
};

VotesNeeded.propTypes = {
  candidate: PropTypes.object,
};

export default VotesNeeded;
