/**
 *
 * CandidateCard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import dynamic from 'next/dynamic';

import { candidateColor, partyRace } from '/helpers/candidatesHelper';
import { daysTill } from '/helpers/dateHelper';

import { FontH3 } from '../typogrophy';
import BlackButton from '../buttons/BlackButton';
import CandidateRoundAvatar from '../CandidateRoundAvatar';
import CandidateProgressBar from '../CandidateProgressBar';
import Modal from '../Modal';
import LoadingAnimation from '../LoadingAnimation';
// optimze
const FollowModal = dynamic(
  () => import('../../CandidateWrapper/FollowModal'),
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

function CandidateCard({ candidate, doubleButton = false }) {
  const {
    id,
    firstName,
    lastName,
    positions,
    followers,
    raceDate,
    votesNeeded,
    support,
  } = candidate;

  // optimize code
  const [showModal, setShowModal] = useState(false);
  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  // end optimize code

  const brightColor = candidateColor(candidate);
  let topPositions = positions;

  if (positions && positions.length > MAX_POSITIONS) {
    topPositions = positions.slice(0, MAX_POSITIONS);
  }

  let thisWeek = 0;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek + support ? support.thisWeek : 0;
    lastWeek = followers.lastWeek + support ? support.lastWeek : 0;
  }

  const days = daysTill(raceDate);
  const diff = thisWeek - lastWeek;
  return (
    <>
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
              <Positions>
                {(topPositions || []).map((position) => (
                  <Position key={position.id} data-cy="position">
                    {position.name}
                  </Position>
                ))}
              </Positions>

              <div style={{ margin: '32px 0 4px' }}>
                <CandidateProgressBar
                  votesNeeded={votesNeeded}
                  peopleSoFar={thisWeek}
                  peopleThisPeriod={diff}
                  color={brightColor}
                  days={days}
                  withAnimation={false}
                />
              </div>

              <ButtonWrapper>
                <Grid container spacing={2}>
                  {doubleButton && (
                    <Grid item xs={6}>
                      <BlackButton
                        fullWidth
                        style={{
                          textTransform: 'none',
                          marginTop: '32px',
                          backgroundColor: brightColor,
                          borderColor: brightColor,
                        }}
                        data-cy="candidate-view"
                        onClick={handleFollow}
                        className="follow-button-card"
                      >
                        Follow
                      </BlackButton>
                    </Grid>
                  )}
                  {doubleButton ? (
                    <Grid item xs={6}>
                      <BlackButton
                        fullWidth
                        className="outlined view-button-card"
                        style={{
                          textTransform: 'none',
                          marginTop: '32px',
                          color: brightColor,
                          borderColor: brightColor,
                        }}
                        data-cy="candidate-view"
                      >
                        View
                      </BlackButton>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
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
                        View
                      </BlackButton>
                    </Grid>
                  )}
                </Grid>
              </ButtonWrapper>
            </Content>
          </Wrapper>
        </a>
      </Link>
      {showModal && (
        <Modal
          open={showModal}
          showCloseButton={false}
          closeModalCallback={() => setShowModal(false)}
        >
          <FollowModal
            inputCandidate={candidate}
            closeModalCallback={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

CandidateCard.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateCard;
