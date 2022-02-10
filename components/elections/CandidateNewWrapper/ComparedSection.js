/**
 *
 * ComparedSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ReactPlayer from 'react-player/lazy';

import Link from 'next/link';
import { useRouter } from 'next/router';

import NotFound from '/containers/shared/NotFoundPage';

import { Body19, Body13 } from '../../shared/typogrophy';
import ComparedCandidateCarousel from './ComparedCandidateCarousel';
import SupportButton from './SupportButton';
import ShareButton from './ShareButton';

const SectionWrapper = styled.div`
  margin-top: 48px;
  padding: 12px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 0;
  }
`;

const FixedEndorse = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding: 16px 32px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.contentMax}) {
    padding: 16px 32px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding-right: 24px;
    padding-left: 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpointsPixels.sm}) {
    padding-right: 18px;
    padding-left: 18px;
  }
  background-color: ${({ theme }) => theme.colors.purple3};
  filter: drop-shadow(0px 0px 16px rgba(62, 0, 140, 0.16));
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray7};
`;

export const SectionHeader = styled(Body19)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;

  &.center {
    color: ${({ theme }) => theme.colors.gray70};
    text-align: center;
  }
  span {
    font-size: 16px;
    font-weight: normal;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 24px;
  }
`;

function ComparedSection({
  candidate,
  supportCallback,
  isUserSupportCandidate,
  removeSupportCallback,
  trackShareCallback,
  helpfulCallback,
  topics,
  user,
}) {
  const router = useRouter();

  if (!candidate) {
    return <NotFound />;
  }
  const { comparedCandidates } = candidate;
  if (candidate.comparedCandidates?.candidates?.length > 0) {
    candidate.comparedCandidates.candidates[0].image = candidate.image;
  }

  return (
    <>
      <SectionWrapper>
        <SectionHeader>Compare candidates in this race</SectionHeader>
        <ComparedCandidateCarousel
          helpfulCallback={helpfulCallback}
          candidates={comparedCandidates?.candidates}
          candidate={candidate}
          topics={topics}
        />
      </SectionWrapper>

      <SectionWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Hidden mdUp>
              <SupportButton
                withForm
                isUserSupportCandidate={isUserSupportCandidate}
                removeSupportCallback={removeSupportCallback}
                supportCallback={supportCallback}
                trackingLabel="bottom endorse button"
                user={user}
              />
              <br />
              <br />
            </Hidden>
            <Hidden smDown>
              <SupportButton
                isUserSupportCandidate={isUserSupportCandidate}
                removeSupportCallback={removeSupportCallback}
                supportCallback={supportCallback}
                trackingLabel="bottom endorse button"
              />
            </Hidden>
          </Grid>
          <Grid item xs={12} md={6}>
            <ShareButton
              trackShareCallback={trackShareCallback}
              candidateId={candidate.id}
            />
          </Grid>
        </Grid>
      </SectionWrapper>

      <Hidden mdUp>
        {!isUserSupportCandidate && (
          <FixedEndorse>
            <SupportButton
              supportCallback={supportCallback}
              removeSupportCallback={removeSupportCallback}
              isUserSupportCandidate={isUserSupportCandidate}
              trackingLabel="fixed endorse button"
            />
            <div style={{ marginTop: '8px' }} className="text-center">
              Your endorsement is a free and powerful way to show and grow
              grassroots support.{' '}
              <Link
                href={`${router.asPath}?article=1ic6T6fhH0jZLNvX5aZkDe`}
                passHref
              >
                <a>Read more.</a>
              </Link>
            </div>
          </FixedEndorse>
        )}
      </Hidden>
    </>
  );
}

ComparedSection.propTypes = {
  candidate: PropTypes.object,
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  isUserSupportCandidate: PropTypes.bool,
  trackShareCallback: PropTypes.func,
  helpfulCallback: PropTypes.func,
  topics: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ComparedSection;
