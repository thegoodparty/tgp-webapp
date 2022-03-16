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
import { FontH3 } from '../typogrophy';
import BlackButton from '../buttons/BlackButton';

const Wrapper = styled.div`
  border-radius: 16px;
  padding: 16px 16px 100px;
  border: 2px solid #ededed;
  color: #000;
  height: 100%;
  position: relative;
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

const Topics = styled.div`
  margin-top: 24px;
  font-weight: 600;
  font-size: 14px;
`;

const Topic = styled.div`
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

function CandidateCard({ candidate }) {
  const {
    id,
    firstName,
    lastName,
    image,
    race,
    state,
    party,
    headline,
    topics,
  } = candidate;

  return (
    <Link
      href={`/candidate/${firstName}-${lastName}/${id}`}
      passHref
      style={{ height: '100%' }}
    >
      <a style={{ height: '100%' }}>
        <Wrapper>
          <ImageWrapper>
            <Image src={image} layout="fill" height="375px" alt="" />
          </ImageWrapper>
          <Content>
            <Name>
              {firstName} {lastName}
            </Name>
            <Gray>{race}</Gray>
            <Gray>
              {state} ({partyResolver(party)}
              {party !== 'I' && ' Party'})
            </Gray>
            <Quote>{headline}</Quote>
            {topics && topics.length > 0 && (
              <Topics>
                <div style={{ marginBottom: '12px' }}>
                  Top Issues for this candidate
                </div>
                {topics.map((topic) => (
                  <Topic>{topic.description}</Topic>
                ))}
              </Topics>
            )}
            <ButtonWrapper>
              <BlackButton
                fullWidth
                style={{ textTransform: 'none', marginTop: '32px' }}
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
