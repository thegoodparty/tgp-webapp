/**
 *
 * EndorsementConfirmationWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import { achievementsHelper } from '/helpers/achievementsHelper';
import { numberFormatter } from '/helpers/numberHelper';

import PageWrapper from '../../shared/PageWrapper';
import { Body13, H1, H3 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import {
  candidateRoute,
  partyResolver,
} from '/helpers/electionsHelper';
import SupportersProgressBar from '../../CandidateWrapper/left/SupportersProgressBar';
import BlackButton from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  padding: 24px 0;
  margin: 0 auto;
  text-align: center;
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
  margin-top: 24px;
  flex-direction: row-reverse;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
    margin-top: 0;
  }
`;

const CandidateName = styled(H3)`
  text-align: left;
  font-size: 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: center;
    margin-top: 12px;
    margin-bottom: 8px;
  }
`;

const PartyName = styled(Body13)`
  text-align: left;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: center;
  }
`;

const TitleCase = styled.span`
  text-transform: capitalize;
`;

const ProgressBarWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Endorsed = styled(Body13)`
  text-align: left;
  color: ${({ theme }) => theme.colors.gray4};
`;

function EndorsementConfirmationWrapper({ candidate, total }) {
  const {
    firstName,
    lastName,
    image,
    race,
    party,
    isDraft,
    draftOffice,
  } = candidate;

  const supportCount = total || 0;
  const achievements = achievementsHelper(supportCount);

  return (
    <PageWrapper>
      <Wrapper>
        <H1>
          You Endorsed {candidate.firstName} {candidate.lastName}!
        </H1>
        <br />
        <AvatarSection>
          <CandidateAvatar
            avatar={image}
            party={party}
            size="large"
            partyBadge
            hideBadge={isDraft}
          />
          <div style={{ flex: 1 }}>
            <CandidateName>
              {firstName} {lastName}
            </CandidateName>
            <PartyName>
              {isDraft && draftOffice !== '' ? (
                draftOffice
              ) : (
                <>
                  {party === 'S' ? (
                    'SAM Party'
                  ) : (
                    <TitleCase>{partyResolver(party).toLowerCase()}</TitleCase>
                  )}{' '}
                  candidate running for {race}{' '}
                </>
              )}
            </PartyName>
          </div>
        </AvatarSection>
        <ProgressBarWrapper>
          <Endorsed>
            <div style={{ paddingLeft: '10px' }}>
              <strong>
                {supportCount} {supportCount === 1 ? 'person' : 'people'}{' '}
                endorsed.
              </strong>{' '}
              Let&apos;s get to {numberFormatter(achievements.nextStep)}!
            </div>
          </Endorsed>
          <SupportersProgressBar
            showSupporters={false}
            votesNeeded={achievements.nextStep}
            peopleSoFar={supportCount}
            fullWidth
            showSuffix={false}
            withAchievement
          />
        </ProgressBarWrapper>
        <br />
        <Link href="/register/password-creation" passHref>
          <a>
            <BlackButton>
              &nbsp; &nbsp; Create a password &nbsp; &nbsp;
            </BlackButton>
          </a>
        </Link>
        <br />
        <br />
        <Link href={candidateRoute(candidate)} passHref>
          <a>
            Go to {candidate.firstName} {candidate.lastName} page
          </a>
        </Link>
      </Wrapper>
    </PageWrapper>
  );
}

EndorsementConfirmationWrapper.propTypes = {
  candidate: PropTypes.object,
  total: PropTypes.number,
};

export default EndorsementConfirmationWrapper;
