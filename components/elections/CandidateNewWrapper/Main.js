/**
 *
 * MainWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ReactPlayer from 'react-player/lazy';
import { Element } from 'react-scroll';
import Link from 'next/link';
import { useRouter } from 'next/router';

import NotFound from 'containers/shared/NotFoundPage';
import { validateLink } from 'helpers/linkHelper';

import ProfileInfo from './ProfileInfo';
import { H1, Body19, Body13 } from '../../shared/typogrophy';
import ComparedCandidateCarousel from './ComparedCandidateCarousel';
import RecentlyJoined from './RecentlyJoined';
import TopQuestions from '../../shared/TopQuestions';
import SupportButton from './SupportButton';
import ShareButton from './ShareButton';
import Updates from './Updates';

const Padder = styled.div`
  padding: 0;
`;

const SectionWrapper = styled.div`
  margin-top: 48px;
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

const HeadlineWrapper = styled.div`
  padding: 18px 0;
`;

const SectionHeader = styled(Body19)`
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

const SectionContent = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
`;

const SocialLink = styled.a`
  margin-right: 25px;
`;

const YoutubePlayer = styled(ReactPlayer)`
  width: unset !important;
`;

const YoutubePlayerWrapper = styled.div`
  overflow: hidden;
  padding: 18px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 0;
  }
  &:first-child {
    border-radius: 8px;
    overflow: hidden;
    filter: drop-shadow(9px 9px 12px rgba(224, 212, 234, 0.9));
  }

  [data-jodit_iframe_wrapper] {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0 !important;
    width: 100% !important;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

function MainWrapper({
  candidate,
  articles,
  supportCallback,
  isUserSupportCandidate,
  removeSupportCallback,
  candidateSupports,
  total,
  trackShareCallback,
}) {
  if (!candidate) {
    return <NotFound />;
  }
  const router = useRouter();
  let website;
  const {
    headline,
    firstName,
    lastName,
    about,
    comparedCandidates,
    facebook,
    twitter,
    tiktok,
    snap,
    heroVideo,
  } = candidate;
  if (candidate.comparedCandidates?.candidates?.length > 0) {
    candidate.comparedCandidates.candidates[0].image = candidate.image;
    ({ website } = candidate.comparedCandidates.candidates[0]);
  }

  return (
    <>
      {heroVideo && (
        <YoutubePlayerWrapper className="top">
          <YoutubePlayer
            url={`https://www.youtube.com/embed/${heroVideo}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
            playing={false}
          />
        </YoutubePlayerWrapper>
      )}
      <Hidden mdUp>
        <HeadlineWrapper>
          <H1>{headline}</H1>
        </HeadlineWrapper>
        <ProfileInfo
          candidate={candidate}
          candidateSupports={candidateSupports}
          total={total}
          supportCallback={supportCallback}
          isUserSupportCandidate={isUserSupportCandidate}
          removeSupportCallback={removeSupportCallback}
          isMobile
        />
      </Hidden>
      <Padder>
        <SectionWrapper style={{ marginTop: '24px' }}>
          <SectionContent dangerouslySetInnerHTML={{ __html: about }} />
        </SectionWrapper>
        <SectionWrapper style={{ marginTop: '24px' }}>
          <SectionHeader style={{ marginBottom: '4px' }}>
            Candidate socials
          </SectionHeader>

          <div style={{ marginTop: '24px' }}>
            {facebook && (
              <SocialLink href={validateLink(facebook)} target="_blank">
                <img
                  src="/images/icons/purple-facebook.svg"
                  alt="facebook"
                  rel="nofollow"
                />
              </SocialLink>
            )}
            {twitter && (
              <SocialLink href={validateLink(twitter)} target="_blank">
                <img
                  src="/images/icons/purple-twitter.svg"
                  alt="twitter"
                  rel="nofollow"
                />
              </SocialLink>
            )}
            {tiktok && (
              <SocialLink href={validateLink(tiktok)} target="_blank">
                <img
                  src="/images/icons/purple-tiktok.svg"
                  alt="tiktok"
                  rel="nofollow"
                />
              </SocialLink>
            )}
            {snap && (
              <SocialLink href={validateLink(snap)} target="_blank">
                <img
                  src="/images/icons/purple-snap.svg"
                  alt="snap"
                  rel="nofollow"
                />
              </SocialLink>
            )}
            {website && (
              <SocialLink href={validateLink(website)} target="_blank" passhref>
                <a target="_blank">
                  <img
                    src="/images/icons/globe-icon.svg"
                    alt="snap"
                    rel="nofollow"
                  />
                </a>
              </SocialLink>
            )}
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader>
            Compare {firstName} {lastName} with others
          </SectionHeader>
          <ComparedCandidateCarousel
            candidates={comparedCandidates?.candidates}
          />
        </SectionWrapper>

        <SectionWrapper>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <SupportButton
                isUserSupportCandidate={isUserSupportCandidate}
                removeSupportCallback={removeSupportCallback}
                supportCallback={supportCallback}
              />
            </Grid>
            <Grid item xs={6}>
              <ShareButton
                trackShareCallback={trackShareCallback}
                candidateId={candidate.id}
              />
            </Grid>
          </Grid>
        </SectionWrapper>

        <Updates candidate={candidate} />
        <Hidden mdUp>
          <SectionWrapper>
            <Element name="recently-all">
              <RecentlyJoined
                candidateSupports={candidateSupports}
                total={total}
              />
            </Element>
          </SectionWrapper>
          {!isUserSupportCandidate && (
            <FixedEndorse>
              <SupportButton
                supportCallback={supportCallback}
                removeSupportCallback={removeSupportCallback}
                isUserSupportCandidate={isUserSupportCandidate}
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

        <TopQuestions articles={articles} />
      </Padder>
    </>
  );
}

MainWrapper.propTypes = {
  candidate: PropTypes.object,
  supportCallback: PropTypes.func,
  removeSupportCallback: PropTypes.func,
  articles: PropTypes.array,
  isUserSupportCandidate: PropTypes.bool,
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  total: PropTypes.number,
  trackShareCallback: PropTypes.func,
};

export default MainWrapper;
