/**
 *
 * CandidateCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import { partyResolver } from '/helpers/electionsHelper';
import Link from 'next/link';
import { Font16, FontH3 } from '../typogrophy';
import BlackButton from '../buttons/BlackButton';
import SupportersProgressBar from '../../CandidateWrapper/Header/SupportersProgressBar';
import { achievementsHelper } from '/helpers/achievementsHelper';
import { numberFormatter } from '/helpers/numberHelper';
import CandidateRoundAvatar from '../CandidateRoundAvatar';
import { candidateColor, partyRace } from '../../../helpers/candidatesHelper';
import { daysTill } from '../../../helpers/dateHelper';

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 26px 26px 100px;
  border: 2px solid #ededed;
  color: #000;
  height: 100%;
  position: relative;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  margin-top: 24px;
`;

const Name = styled(FontH3)`
  font-size: 21px;
  font-weight: 600;
  margin: 0 0 8px;
`;

const Gray = styled.div`
  color: #4d4d4d;
`;

const SoFar = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Quote = styled.div`
  border-left: solid 2px #e6e6e6;
  margin: 24px 0;
  padding-left: 16px;
  font-weight: 600;
  font-size: 14px;
  font-style: italic;
  min-height: 36px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Positions = styled.div`
  margin-top: 14px;
  font-weight: 600;
  font-size: 14px;
`;

const Position = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  background-color: #f3f3f3;
  margin: 4px 4px 0 0;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: calc(100% - 48px);
`;

const Number = styled.div`
  font-size: 14px;
  font-weight: 900;

  &.positive {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const NumberTitle = styled.div`
  font-size: 12px;
`;

const MAX_POSITIONS = 6;

function CandidateCard({ candidate }) {
  const {
    id,
    firstName,
    lastName,
    positions,
    followers,
    raceDate,
    votesNeeded,
  } = candidate;
  const brightColor = candidateColor(candidate);
  let topPositions = positions;

  if (positions && positions.length > MAX_POSITIONS) {
    topPositions = positions.slice(0, MAX_POSITIONS);
  }

  let thisWeek = 0;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek;
    lastWeek = followers.lastWeek;
  }

  const days = daysTill(raceDate);
  const diff = thisWeek - lastWeek;
  return (
    <Link
      href={`/candidate/${firstName}-${lastName}/${id}`}
      passHref
      style={{ height: '100%' }}
    >
      <a
        style={{ height: '100%' }}
        className="no-underline candidate-card"
        data-cy="candidate-link"
        id={`candidate-card-${firstName}-${lastName}`}
      >
        <Wrapper>
          <ImageWrapper>
            <CandidateRoundAvatar candidate={candidate} large />
          </ImageWrapper>
          <Content>
            <Name data-cy="candidate-name">
              {firstName} {lastName}
            </Name>
            <Gray data-cy="candidate-party">{partyRace(candidate)}</Gray>

            {topPositions && topPositions.length > 0 && (
              <Positions>
                {topPositions.map((position) => (
                  <Position key={position.id} data-cy="position">
                    {position.name}
                  </Position>
                ))}
              </Positions>
            )}

            <Grid container spacing={3} style={{ margin: '32px 0 4px' }}>
              <Grid item xs={4}>
                <Number>{numberFormatter(thisWeek)}</Number>
                <NumberTitle>total followers</NumberTitle>
              </Grid>
              <Grid item xs={4}>
                <Number className={diff > 0 && 'positive'}>
                  {diff > 0 && '+'}
                  {numberFormatter(diff)}
                </Number>
                <NumberTitle>from last week</NumberTitle>
              </Grid>
              {days > 0 && (
                <Grid item xs={4}>
                  <Number>
                    {numberFormatter(days)} day{days !== 1 ? 's' : ''}
                  </Number>
                  <NumberTitle>until election</NumberTitle>
                </Grid>
              )}
            </Grid>

            <SupportersProgressBar
              votesNeeded={votesNeeded}
              peopleSoFar={thisWeek}
              peopleThisPeriod={diff}
              color={brightColor}
              days={days}
            />

            <ButtonWrapper>
              <BlackButton
                fullWidth
                style={{
                  textTransform: 'none',
                  marginTop: '32px',
                  backgroundColor: brightColor,
                  borderColor: brightColor,
                }}
                data-cy="candidate-view"
              >
                View Campaign
              </BlackButton>
            </ButtonWrapper>
          </Content>
        </Wrapper>
      </a>
    </Link>
  );
}

CandidateCard.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateCard;
