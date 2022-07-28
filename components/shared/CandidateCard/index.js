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

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 16px 16px 100px;
  border: 2px solid #ededed;
  color: #000;
  height: 100%;
  position: relative;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 375px;

  img {
    object-fit: contain;
    object-position: center center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const Content = styled.div`
  padding: 24px 8px 8px;
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
  margin-top: 24px;
  font-weight: 600;
  font-size: 14px;
`;

const Position = styled.div`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  background-color: #e1e1e1;
  margin: 4px 4px 0 0;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: calc(100% - 48px);
`;

const MAX_POSITIONS = 3;

function CandidateCard({ candidate }) {
  const {
    id,
    firstName,
    lastName,
    image,
    race,
    supporters,
    party,
    otherParty,
    headline,
    positions,
    color,
  } = candidate;
  const achievements = achievementsHelper(supporters);
  const brightColor = color?.color ? color.color : '#000';
  let topPositions = positions;

  if (positions && positions.length > MAX_POSITIONS) {
    topPositions = positions.slice(0, MAX_POSITIONS);
  }
  return (
    <Link
      href={`/candidate/${firstName}-${lastName}/${id}`}
      passHref
      style={{ height: '100%' }}
    >
      <a style={{ height: '100%' }} className="no-underline" data-cy="candidate-link">
        <Wrapper>
          <ImageWrapper>
            {image && (
              <Image
                src={image}
                layout="fill"
                alt={`${firstName} ${lastName}`}
                data-cy="candidate-img"
              />
            )}
          </ImageWrapper>
          <Content>
            <Name data-cy="candidate-name">
              {firstName} {lastName}
            </Name>
            <Gray data-cy="candidate-party">
              {partyResolver(party, otherParty)} {party !== 'I' ? 'Party' : ''}{' '}
              Candidate <br />
              for <strong>{race}</strong>
            </Gray>
            <SoFar>
              <strong>
                {supporters} {supporters === 1 ? 'person' : 'people'} endorsed.
              </strong>
              <div>
                Let&apos;s get to {numberFormatter(achievements.nextStep)}!
              </div>
            </SoFar>
            <SupportersProgressBar
              showSupporters={false}
              votesNeeded={achievements.nextStep}
              peopleSoFar={supporters}
              fullWidth
              showSuffix={false}
              color={brightColor}
              // withAchievement
            />
            <Quote>{headline}</Quote>
            {topPositions && topPositions.length > 0 && (
              <Positions>
                <div style={{ marginBottom: '12px' }} data-cy="position-title">
                  Top Issues for this candidate
                </div>
                {topPositions.map((position) => (
                  <Position key={position.id} data-cy="position">{position.name}</Position>
                ))}
              </Positions>
            )}
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
