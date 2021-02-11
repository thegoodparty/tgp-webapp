/**
 *
 * ComparedCandidate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H1, Body11 } from '../../shared/typogrophy';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';

const Wrapper = styled.div`
  width: 170px;
  margin: 25px 15px 0;
`;
const CandidateName = styled(H1)`
  font-size: 27px;
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

const CandidateNameWrapper = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 25px;
  margin-top: 15px;
`;

const WebsiteLink = styled(Body11)`
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.purple};
`;

const InfoWrapper = styled(Body11)`
  && {
    margin-top: 32px;
    text-align: center;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray7};
    line-height: 180%;
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
  return (
    <Wrapper>
      <ChallengerAvatar party={party} avatar={image} />
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
    </Wrapper>
  );
}

ComparedCandidate.propTypes = {
  candidate: PropTypes.object,
};

export default ComparedCandidate;
