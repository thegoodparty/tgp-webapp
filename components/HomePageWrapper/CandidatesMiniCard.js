import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

import CandidateRoundAvatar from '../shared/CandidateRoundAvatar';
import { candidateRoute } from '../../helpers/electionsHelper';
import { candidateColor, partyRace } from '../../helpers/candidatesHelper';
import { daysTill } from '../../helpers/dateHelper';
import SupportersProgressBar from '../CandidateWrapper/Header/SupportersProgressBar';
import { numberFormatter } from '../../helpers/numberHelper';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';

const Wrapper = styled.div`
  height: 100%;
  padding-bottom: 90px;
  position: relative;
`;

const Name = styled.div`
  font-weight: 900;
  font-size: 26px;
  margin: 12px 0 6px;
`;
const Party = styled.div`
  font-size: 16px;
  margin-bottom: 35px;
  min-height: 42px;
`;

const Number = styled.div`
  font-size: 17px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 20px;
  }

  &.positive {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const CandidateMiniCard = ({ candidate }) => {
  const { firstName, lastName, followers, raceDate, votesNeeded, color } =
    candidate;

  let thisWeek = 0;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek;
    lastWeek = followers.lastWeek;
  }

  const days = daysTill(raceDate);

  const diff = thisWeek - lastWeek;

  const brightColor = candidateColor(candidate);
  return (
    <Wrapper>
      <Link href={candidateRoute(candidate)} passHref>
        <a
          className="no-underline"
          data-cy="candidate-link"
          id={`candidate-preview-${firstName}-${lastName}`}
        >
          <CandidateRoundAvatar candidate={candidate} />
          <Name>
            {firstName} {lastName}
          </Name>
          <Party>{partyRace(candidate, false)}</Party>

          <Grid container spacing={3} style={{ marginBottom: '6px' }}>
            <Grid item xs={4}>
              <Number>{numberFormatter(thisWeek)}</Number>
              total followers
            </Grid>
            <Grid item xs={4}>
              <Number className={diff > 0 && 'positive'}>
                {diff > 0 && '+'}
                {numberFormatter(diff)}
              </Number>
              from last week
            </Grid>
          </Grid>

          <SupportersProgressBar
            votesNeeded={votesNeeded}
            peopleSoFar={thisWeek}
            peopleThisPeriod={diff}
            color={brightColor}
            days={days}
            withAchievement={false}
          />
          <ButtonWrapper>
            <BlackButton
              fullWidth
              style={{
                backgroundColor: brightColor,
                borderColor: brightColor,
                marginTop: '30px',
              }}
            >
              <InnerButton>View Campaign</InnerButton>
            </BlackButton>
          </ButtonWrapper>
        </a>
      </Link>
    </Wrapper>
  );
};

export default CandidateMiniCard;
