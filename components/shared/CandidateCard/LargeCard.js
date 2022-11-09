/**
 *
 * LargeCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';

import { candidateColor, partyRace } from '/helpers/candidatesHelper';

import { FontH3 } from '../typogrophy';
import BlackButton from '../buttons/BlackButton';
import CandidateRoundAvatar from '../CandidateRoundAvatar';
import LoadingAnimation from '../LoadingAnimation';
import { candidateRoute } from '../../../helpers/electionsHelper';
import { LgUpOnly, SmOnly } from '../navigation/NavWrapper';
import CandidateProgressBar from '../CandidateProgressBar';
const FollowButtonContainer = dynamic(
  () => import('/containers/shared/FollowButtonContainer'),
  {
    loading: () => (
      <>
        <LoadingAnimation fullPage={false} />
      </>
    ),
  },
);

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 16px 36px;
  border: 2px solid #ededed;
  color: #000;
  height: 100%;
  position: relative;
  background-color: #fff;
  margin-bottom: 24px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  margin-top: 16px;
`;

const Name = styled(FontH3)`
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 6px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 50px;
  }
`;

const ProgressWrapper = styled.div`
  margin-top: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 60px;
  }
`;

const Gray = styled.div`
  color: #4d4d4d;
`;

const Positions = styled.div`
  font-weight: 600;
  font-size: 14px;
  height: 32px;
  overflow: hidden;
`;

const Position = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  background-color: #f3f3f3;
  margin: 5px 5px 0 0;
`;

const ExtraInfo = styled.div`
  font-size: 12px;
  margin-top: 24px;

  p {
    margin: 0;
    display: inline-block;
    font-weight: 300;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 14px;
  }
`;

const Card = styled.div`
  padding-top: 36px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    box-shadow: 2px 2px 15px 2px rgba(0, 0, 0, 0.11);
    border-radius: 6px;
    padding: 26px 19px;
    margin-top: 0;
    display: inline-block;
  }
`;

const CardIem = styled.div`
  margin-bottom: 9px;
  font-size: 12px;
`;

const MAX_POSITIONS = 6;

function LargeCard({ candidate, withFollowButton = false }) {
  if (!candidate) {
    return <></>;
  }
  const {
    firstName,
    lastName,
    positions,
    whyRunning,
    whyIndependent,
    experience,
    hometown,
    occupation,
    funFact,
    didWin,
    followers,
    support,
  } = candidate;

  const brightColor = candidateColor(candidate);
  let topPositions = positions;

  if (positions && positions.length > MAX_POSITIONS) {
    topPositions = positions.slice(0, MAX_POSITIONS);
  }

  const showCard = hometown || occupation || funFact;

  let thisWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek + (support ? support.thisWeek : 0);
  }


  return (
    <Link href={candidateRoute(candidate)} passHref style={{ height: '100%' }}>
      <a
        style={{ height: '100%' }}
        className="no-underline candidate-card"
        data-cy="candidate-link"
        id={`candidate-card-${firstName}-${lastName}`}
      >
        <Wrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
              <ImageWrapper>
                <CandidateRoundAvatar candidate={candidate} large largeAll />
              </ImageWrapper>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Content>
                    <Positions>
                      {topPositions && topPositions.length > 0 && (
                        <>
                          {topPositions.map((position) => (
                            <React.Fragment key={position?.id}>
                              {position && (
                                <Position key={position.id} data-cy="position">
                                  {position.name}
                                </Position>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      )}
                    </Positions>
                  </Content>
                  <Name data-cy="candidate-name">
                    {firstName} {lastName}
                  </Name>
                  <Gray data-cy="candidate-party">{partyRace(candidate)}</Gray>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <ProgressWrapper>
                <CandidateProgressBar
                  candidate={candidate}
                  peopleSoFar={thisWeek}
                />
                <BlackButton
                  fullWidth
                  className="view-button-card"
                  style={{
                    textTransform: 'none',
                    marginTop: '32px',
                    backgroundColor: brightColor,
                    borderColor: brightColor,
                  }}
                  data-cy="candidate-view"
                >
                  {didWin === 'Yes'
                    ? 'VIEW ISSUES'
                    : didWin === 'No'
                    ? 'VIEW 2022 CAMPAIGN'
                    : 'VIEW CAMPAIGN'}
                </BlackButton>
              </ProgressWrapper>
            </Grid>
            <Grid item xs={12} lg={3}></Grid>
            <Grid item xs={12} lg={9}>
              {showCard && (
                <Card>
                  {hometown && (
                    <CardIem>
                      <strong>Home Town &amp; State:</strong> {hometown}
                    </CardIem>
                  )}
                  {occupation && (
                    <CardIem>
                      <strong>Current Occupation:</strong> {occupation}
                    </CardIem>
                  )}
                  {funFact && (
                    <CardIem>
                      <strong>Fun Fact:</strong> {funFact}
                    </CardIem>
                  )}
                </Card>
              )}
              {whyRunning && (
                <ExtraInfo style={{ marginTop: '34px' }}>
                  <strong>Why I&apos;m running</strong>: {whyRunning}
                </ExtraInfo>
              )}

              {whyIndependent && (
                <ExtraInfo>
                  <strong>Why I&apos;m Independent</strong>: {whyIndependent}
                </ExtraInfo>
              )}

              {experience && (
                <ExtraInfo>
                  <strong>Prior Experience</strong>: {experience}
                </ExtraInfo>
              )}
            </Grid>
          </Grid>
        </Wrapper>
      </a>
    </Link>
  );
}

LargeCard.propTypes = {
  candidate: PropTypes.object,
};

export default LargeCard;
