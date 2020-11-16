import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { H2, Body, Body12, Body9 } from 'components/shared/typogrophy';
import {
  rankPageLink,
  partyResolver,
  candidateCalculatedFields,
} from 'helpers/electionsHelper';
import { percHelper, numberFormatter } from 'helpers/numberHelper';
import ChallengerAvatar from './ChallengerAvatar';
import VotesNeeded from './VotesNeeded';
import WonLostElection from '../../shared/WonLostElection';

const ChallengerItemWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  overflow: hidden;
`;

const ChallengerName = styled(H2)`
  margin-top: 1rem;
  margin-bottom: 0rem;
  text-align: center;
`;

const ChallengerInfo = styled(Body)`
  margin-bottom: 1.5rem;
  margin-top: 0;
  text-align: center;
`;

const ChallengeStats = styled(Body12)`
  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
  margin: 0;
  &.value {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.green};
  }
`;

const ChallengeStatsSmall = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
  margin: 0;
  &.value {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.green};
  }
`;

const NeededVotesWrapper = styled.div`
  margin-top: 2rem;
`;

const NeededVotes = styled.p`
  font: normal normal 13px/18px normal;
  color: ${({ theme }) => theme.colors.gray7};
  font-family: unset;
  text-align: center;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const FullLine = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.grayC};
  border-radius: 3px;
  position: relative;
  top: 4px;
`;

const PercentLine = styled.div`
  border-bottom: 6px solid ${({ theme }) => theme.colors.green};
  border-radius: 3px;
  width: ${props => props.percent};
  position: relative;
  max-width: 100%;
`;

const LineWrapper = styled.div`
  padding: 0 12px;
  overflow: hidden;
`;

const TitleCase = styled.span`
  text-transform: capitalize;
`;

const ChallengerItem = ({ challenger, id }) => {
  const calculatedChallanger = candidateCalculatedFields(challenger);
  const {
    image,
    party,
    name,
    state,
    district,
    likelyVoters,
    votesReceived,
    votesNeeded,
    raised,
    incumbentRaised,
    chamber,
    xTimes,
    smallDonorPerc,
  } = calculatedChallanger;
  const perc = percHelper(smallDonorPerc, true);
  const partyString = partyResolver(party);

  const districtInfo = `${state.toUpperCase()}${
    district ? `-${district}` : ' Senate'
  }`;
  const challengerInfo = (
    <>
      <TitleCase>{partyString.toLowerCase()}</TitleCase> for {districtInfo}
    </>
  );
  const votes = votesReceived || likelyVoters;
  const neededPercent = parseInt((votes * 100) / votesNeeded, 10);

  const disadvantage = xTimes || (incumbentRaised / raised).toFixed(2);
  const getRankPageLink = () => rankPageLink(chamber, state, district);
  const fundingText =
    perc > 50 ? 'Small Donor Funding' : 'Relative Funding Rate';
  const funding =
    perc > 50 ? perc : ((raised * 100) / incumbentRaised).toFixed(2);
  return (
    <ChallengerItemWrapper id={id}>
      <Link href={getRankPageLink()}>
        <a>
          <ChallengerAvatar avatar={image} party={party} />
          <ChallengerName>{name}</ChallengerName>
          <ChallengerInfo>{challengerInfo}</ChallengerInfo>
          <Grid container>
            <Grid item xs={6}>
              <ChallengeStats className="value">
                {funding < 1 ? funding : numberFormatter(funding)}%
              </ChallengeStats>
              <ChallengeStatsSmall>{fundingText}</ChallengeStatsSmall>
            </Grid>
            <Grid item xs={6}>
              <ChallengeStats className="value">
                {numberFormatter(disadvantage)}x
              </ChallengeStats>
              <ChallengeStatsSmall>Funding Disadvantage</ChallengeStatsSmall>
            </Grid>
          </Grid>
          <NeededVotesWrapper>
            <NeededVotes>
              <VotesNeeded candidate={challenger} />
            </NeededVotes>
            <LineWrapper>
              <FullLine />
              <PercentLine percent={neededPercent + '%'} />
            </LineWrapper>
          </NeededVotesWrapper>
          <WonLostElection candidate={challenger} />
        </a>
      </Link>
    </ChallengerItemWrapper>
  );
};

ChallengerItem.propTypes = {
  challenger: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default ChallengerItem;
