/**
 *
 * CandidateCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { partyResolver } from '/helpers/electionsHelper';
import { numberFormatter } from '/helpers/numberHelper';
import Link from 'next/link';

import CandidateAvatar from './CandidateAvatar';
import { Body13 } from '../typogrophy';
import SupportersProgressBar from '../../CandidateWrapper/left/SupportersProgressBar';
import { achievementsHelper } from '/helpers/achievementsHelper';
import BlackButton from '../buttons/BlackButton';

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
  margin-bottom: 24px;
  min-height: 36px;
`;

const Headline = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 16px;
  margin: 18px 0;
  min-height: 40px;
  padding: 0 8px;
`;

const ButtonInner = styled.div`
  padding: 0 40px;
  font-size: 13px;
`;

const Endorsed = styled(Body13)`
  text-align: left;
  color: ${({ theme }) => theme.colors.gray4};
`;

function CandidateCard({ candidate }) {
  const {
    id,
    firstName,
    lastName,
    image,
    race,
    party,
    supporters,
    headline,
    isDraft,
    draftOffice,
  } = candidate;

  const achievements = achievementsHelper(supporters);
  return (
    <Link href={`/candidate/${firstName}-${lastName}/${id}`} passHref>
      <a>
        <Wrapper>
          <CandidateAvatar
            avatar={image}
            party={party}
            size="medium"
            partyBadge
            centered
            hideBadge={isDraft}
          />
          <Name>
            {firstName} {lastName}
          </Name>
          <For>
            {isDraft && draftOffice !== '' ? (
              draftOffice
            ) : (
              <>
                {party === 'S' ? (
                  'SAM Party'
                ) : (
                  <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase>
                )}{' '}
                candidate running for {race}
              </>
            )}
          </For>
          <Endorsed>
            <div style={{ paddingLeft: '8px' }}>
              <strong>
                {supporters} {supporters === 1 ? 'person' : 'people'} endorsed.
              </strong>{' '}
              Let&apos;s get to {numberFormatter(achievements.nextStep)}!
            </div>
          </Endorsed>

          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={achievements.nextStep}
            peopleSoFar={supporters}
            fullWidth
            showSuffix={false}
            withAchievement
          />
          <Headline>{headline}</Headline>

          <BlackButton>
            <ButtonInner>See Campaign</ButtonInner>
          </BlackButton>
        </Wrapper>{' '}
      </a>
    </Link>
  );
}

CandidateCard.propTypes = {
  candidate: PropTypes.object,
};

export default CandidateCard;
