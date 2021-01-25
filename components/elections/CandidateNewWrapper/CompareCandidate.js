/**
 *
 * ComparedCandidate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import NotFound from 'containers/shared/NotFoundPage';
import ReactPlayer from 'react-player/lazy';
import PageWrapper from '../../shared/PageWrapper';
import ProfileInfo from './ProfileInfo';
import { H1, Body19, Body13, Body11 } from '../../shared/typogrophy';
import ChallengerAvatar from '../../home/ChallengersSection/ChallengerAvatar';

const Wrapper = styled.div`
  width: 170px;
  margin-right: 30px;
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
  'X': "/images/no.svg",
  'x': "/images/no.svg",
  'V': "/images/checkmark.svg",
  'v': "/images/checkmark.svg",
  '?': "/images/question.svg",
};
function ComparedCandidate({ candidate }) {
  if (!candidate) {
    return <NotFound />;
  }
  const { image, name, party } = candidate;
  const comparedFactors = { ...candidate };
  delete comparedFactors['name'];
  delete comparedFactors['party'];
  console.log('cand', candidate, image);
  const factors = Object.keys(comparedFactors).sort();
  return (
    <Wrapper>
      <ChallengerAvatar
        party="L"
        avatar="https://assets.thegoodparty.org/candidates/david-kim-503-g9nsur.jpeg"
      />
      <CandidateNameWrapper>
        <CandidateName>{name}</CandidateName>
      </CandidateNameWrapper>
      <WebsiteLink>
        CAmpaign Website <img src="/images/linkopen.svg" />
      </WebsiteLink>
      <InfoWrapper>
        $175/HR <br /> hOURLY FUNDING
      </InfoWrapper>
      <InfoWrapper>
        7.8%  <br /> relative Funding
      </InfoWrapper>
      {factors.map(factor => (
        <InfoWrapper>
          <img src={ICONS[comparedFactors[factor]]} alt="icon" /> <br />{' '}
          {factor}
        </InfoWrapper>
      ))}
    </Wrapper>
  );
}

ComparedCandidate.propTypes = {
  candidate: PropTypes.object,
};

export default ComparedCandidate;
