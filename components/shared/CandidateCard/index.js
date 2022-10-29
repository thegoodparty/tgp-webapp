/**
 *
 * CandidateCard
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
import CandidateProgressBar from '../CandidateProgressBar';
import LoadingAnimation from '../LoadingAnimation';
import { candidateRoute } from '../../../helpers/electionsHelper';
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

const Positions = styled.div`
  margin-top: 14px;
  font-weight: 600;
  font-size: 14px;
  height: 56px;
  overflow: hidden;
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

const MAX_POSITIONS = 6;

function CandidateCard({ candidate, withFollowButton = false }) {
  if (!candidate) {
    return <></>;
  }
  const { firstName, lastName, positions, followers, support } = candidate;

  const brightColor = candidateColor(candidate);
  let topPositions = positions;

  if (positions && positions.length > MAX_POSITIONS) {
    topPositions = positions.slice(0, MAX_POSITIONS);
  }

  let thisWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek + (support ? support.thisWeek : 0);
  }

  const WrapperElement = ({ children }) => {
    if (withFollowButton) {
      return (
        <div
          id={`candidate-card-${firstName}-${lastName}`}
          className="candidate-card"
        >
          {children}
        </div>
      );
    }
    return (
      <Link
        href={candidateRoute(candidate)}
        passHref
        style={{ height: '100%' }}
      >
        <a
          style={{ height: '100%' }}
          className="no-underline candidate-card"
          data-cy="candidate-link"
          id={`candidate-card-${firstName}-${lastName}`}
        >
          {children}
        </a>
      </Link>
    );
  };
  return (
    <WrapperElement>
      <Wrapper>
        <ImageWrapper>
          <CandidateRoundAvatar candidate={candidate} large />
        </ImageWrapper>
        <Content>
          <Name data-cy="candidate-name">
            {firstName} {lastName}
          </Name>
          <Gray data-cy="candidate-party">{partyRace(candidate)}</Gray>

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

          <div style={{ margin: '32px 0 4px' }}>
            <CandidateProgressBar
              candidate={candidate}
              peopleSoFar={thisWeek}
              withAnimation={false}
            />
          </div>

          <ButtonWrapper>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {withFollowButton ? (
                  <FollowButtonContainer candidate={candidate} fullWidth />
                ) : (
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
                    VIEW CAMPAIGN
                  </BlackButton>
                )}
              </Grid>
            </Grid>
          </ButtonWrapper>
        </Content>
      </Wrapper>
    </WrapperElement>
  );
}

CandidateCard.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateCard;
