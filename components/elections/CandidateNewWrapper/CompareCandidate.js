/**
 *
 * ComparedCandidate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H3, Body11 } from '../../shared/typogrophy';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';

const CandidateName = styled(H3)`
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

const CandidateNameWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const InfoWrapper = styled(Body11)`
  margin-top: 32px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray7};
  line-height: 1.8 !important;
  img {
    display: inline-block;
    margin-bottom: 5px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 36px;
  }
`;
const ICONS = {
  X: '/images/no.svg',
  x: '/images/no.svg',
  V: '/images/checkmark.svg',
  v: '/images/checkmark.svg',
  Y: '/images/checkmark.svg',
  y: '/images/checkmark.svg',
  No: '/images/no.svg',
  Yes: '/images/checkmark.svg',
  '?': '/images/question.svg',
};
function ComparedCandidate({ candidate }) {
  if (!candidate) {
    return <NotFound />;
  }
  const { image, name, party } = candidate;
  const comparedFactors = { ...candidate };
  delete comparedFactors.name;
  delete comparedFactors.party;
  delete comparedFactors.image;
  const factors = Object.keys(comparedFactors);
  const cleanParty = party ? party.charAt(0) : '';
  return (
    <>
      <ChallengerAvatar party={cleanParty} avatar={image} />
      <CandidateNameWrapper>
        <CandidateName>{name}</CandidateName>
      </CandidateNameWrapper>

      {factors.map(factor => (
        <InfoWrapper>
          {ICONS[comparedFactors[factor]] ? (
            <img src={ICONS[comparedFactors[factor]]} alt="icon" />
          ) : (
            <>{comparedFactors[factor]}</>
          )}{' '}
          <br /> {factor}
        </InfoWrapper>
      ))}
    </>
  );
}

ComparedCandidate.propTypes = {
  candidate: PropTypes.object,
};

export default ComparedCandidate;
