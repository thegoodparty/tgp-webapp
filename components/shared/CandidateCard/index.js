/**
 *
 * CandidateCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { partyResolver } from 'helpers/electionsHelper';
import { kFormatter } from 'helpers/numberHelper';
import Link from 'next/link';

import CandidateAvatar from './CandidateAvatar';
import { Body11 } from '../typogrophy';
import SupportersProgressBar from '../../elections/SupportersProgressBar';
import { PurpleButton } from '../buttons';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.purple3};
  border-radius: 8px;
  padding: 20px 25px;
  text-align: center;
  box-shadow: -9px 18px 30px rgba(224, 212, 234, 0.2),
    18px -18px 30px rgba(224, 212, 234, 0.2),
    -18px -18px 30px rgba(255, 255, 255, 0.9),
    18px 18px 30px rgba(224, 212, 234, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(224, 212, 234, 0.5);
`;

const Name = styled.h3`
  font-size: 23px;
  font-weight: 700;
  margin: 20px 0;
  color: #000;
`;

const TitleCase = styled.span`
  text-transform: capitalize;
`;

const For = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 28px;
`;

const LikelyVoters = styled.div`
  color: ${({ theme }) => theme.colors.gray7};
  font-size: 11px;
  span {
    color: ${({ theme }) => theme.colors.gray3};
    font-size: 16px;
    font-weight: 600;
    margin-right: 4px;
  }
`;

const Headline = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 16px;
  margin: 18px 0;
  min-height: 40px;
`;

const ButtonInner = styled.div`
  padding: 0 40px;
  font-size: 13px;
`;

function CandidateCard({ candidate }) {
  const {
    id,
    firstName,
    lastName,
    image,
    race,
    party,
    likelyVoters,
    votesNeeded,
    supporters,
    headline,
  } = candidate;

  const intLikelyVoters = parseInt(likelyVoters, 10);
  return (
    <Link href={`/candidate/${firstName}-${lastName}/${id}`} passHref>
      <a>
        <Wrapper>
          <CandidateAvatar
            avatar={image}
            party={party}
            size="medium"
            partyBadge
          />
          <Name>
            {firstName} {lastName}
          </Name>
          <For>
            <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase>{' '}
            candidate running for {race}
          </For>
          <Grid container>
            <Grid item xs={6}>
              <LikelyVoters>
                <span>{kFormatter(intLikelyVoters + supporters)}</span> likely
                voters
              </LikelyVoters>
            </Grid>
            <Grid item xs={6}>
              {supporters === 0 ? (
                <>&nbsp;</>
              ) : (
                <LikelyVoters>
                  <span>{supporters}</span>
                  {supporters === 1 ? 'person' : 'people'} endorsing
                </LikelyVoters>
              )}
            </Grid>
          </Grid>
          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={votesNeeded}
            peopleSoFar={supporters + intLikelyVoters}
            fullWidth
          />
          <Headline>{headline}</Headline>

          <PurpleButton>
            <ButtonInner>See Campaign</ButtonInner>
          </PurpleButton>
        </Wrapper>{' '}
      </a>
    </Link>
  );
}

CandidateCard.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateCard;
