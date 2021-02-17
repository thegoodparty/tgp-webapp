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

import NotFound from 'containers/shared/NotFoundPage';

import ProfileInfo from './ProfileInfo';
import { H1, Body19, Body13, Body11 } from '../../shared/typogrophy';
import ComparedCandidateCarousel from './ComparedCandidateCarousel';
import RecentlyJoined from './RecentlyJoined';
import TopQuestions from '../../shared/TopQuestions';
import SupportButton from './SupportButton';
import ShareButton from './ShareButton';

const Padder = styled.div`
  padding: 0 18px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }
`;

const SectionWrapper = styled.div`
  margin-top: 48px;
`;

const CampaignSummaryHeadLine = styled(H1)`
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 800;
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

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
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

const UpdatedDate = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  font-size: 19px;
  margin-top: 24px;
  line-height: 25px;
`;
const UpdatedBy = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
  font-size: 16px;
  margin-bottom: 12px;
`;
function MainWrapper({
  candidate,
  articles,
  supportCallback,
  isUserSupportCandidate,
  removeSupportCallback,
  candidateSupports,
}) {
  if (!candidate) {
    return <NotFound />;
  }
  const {
    firstName,
    lastName,
    campaignSummary,
    race,
    about,
    comparedCandidates,
    facebook,
    twitter,
    heroVideo,
    updates,
  } = candidate;
  if (candidate.comparedCandidates?.candidates?.length > 0) {
    candidate.comparedCandidates.candidates[0].image = candidate.image;
  }
  const city = race?.includes('Mayor of')
    ? `${race.replace('Mayor of', '')} city hall`
    : race;
  return (
    <>
      {heroVideo && (
        <YoutubePlayerWrapper>
          <YoutubePlayer
            url={`https://www.youtube.com/embed/${heroVideo}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
            playing={false}
          />
        </YoutubePlayerWrapper>
      )}
      <Hidden smUp>
        <div
          style={{
            height: 200,
            background:
              'linear-gradient(rgba(17, 17, 17, 0.16) 11.98%, rgba(17, 17, 17, 0.8) 68.9%)',
            position: 'absolute',
            width: '100%',
          }}
        />
        <ProfileInfo candidate={candidate} isMobile />
      </Hidden>
      <Padder>
        <SectionWrapper style={{ marginTop: heroVideo ? '48px' : 0 }}>
          <CampaignSummaryHeadLine
            style={{ marginTop: heroVideo ? '64px' : 0 }}
          >
            Help {firstName} {lastName} take back {city}
          </CampaignSummaryHeadLine>
          <SectionContent
            dangerouslySetInnerHTML={{ __html: campaignSummary }}
          />
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader>About</SectionHeader>
          <SectionContent dangerouslySetInnerHTML={{ __html: about }} />
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader>Compare Candidates</SectionHeader>
          <ComparedCandidateCarousel
            candidates={comparedCandidates.candidates}
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
              <ShareButton />
            </Grid>
          </Grid>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader>Connect with {firstName}</SectionHeader>
          <div>
            {facebook && (
              <SocialLink href={facebook}>
                <img
                  src="/images/icons/facebook-icon.svg"
                  alt="facebook"
                  rel="nofollow"
                  target="_blank"
                />
              </SocialLink>
            )}
            {twitter && (
              <SocialLink href={twitter}>
                <img
                  src="/images/icons/twitter-icon.svg"
                  alt="twitter"
                  rel="nofollow"
                  target="_blank"
                />
              </SocialLink>
            )}
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader>Updates({updates.length})</SectionHeader>
          {updates.map((update, index) => (
            <YoutubePlayerWrapper key={index}>
              <UpdatedDate>August 4, 2020</UpdatedDate>
              <UpdatedBy>by Cameron Sadeghi, The Good Party</UpdatedBy>
              <SectionContent
                dangerouslySetInnerHTML={{ __html: update }}
                style={{ marginBottom: 20 }}
              />
            </YoutubePlayerWrapper>
          ))}
          {/*<div style={{ textAlign: 'center' }}>*/}
          {/*  <PurpleButton*/}
          {/*    className="outline"*/}
          {/*    style={{ paddingRight: 60, paddingLeft: 60 }}*/}
          {/*  >*/}
          {/*    <InnerButton>*/}
          {/*      <span>READ MORE UPDATES</span>*/}
          {/*    </InnerButton>*/}
          {/*  </PurpleButton>*/}
          {/*</div>*/}
        </SectionWrapper>
        <Hidden smUp>
          <SectionWrapper>
            <RecentlyJoined candidateSupports={candidateSupports} />
          </SectionWrapper>
        </Hidden>
        {/*<SectionWrapper>*/}
        {/*  <SectionHeader className="center">*/}
        {/*    How The Good Party Works <br />*/}
        {/*    <span>We make votes matter more than money</span>*/}
        {/*  </SectionHeader>*/}
        {/*<HowTo>*/}
        {/*  <div>*/}
        {/*    <img*/}
        {/*      src="/images/thank-you.png"*/}
        {/*      alt="thank-you"*/}
        {/*      width="100%"*/}
        {/*      height="100%"*/}
        {/*    />*/}
        {/*    <HowToTitle>*/}
        {/*      {' '}*/}
        {/*      See Good Candidates challenging THE status quo*/}
        {/*    </HowToTitle>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <img*/}
        {/*      src="/images/slide12.png"*/}
        {/*      alt="thank-you"*/}
        {/*      width="100%"*/}
        {/*      height="100%"*/}
        {/*    />*/}
        {/*    <HowToTitle>*/}
        {/*      {' '}*/}
        {/*      Add your vote to their crowd-voting campaigns*/}
        {/*    </HowToTitle>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <img*/}
        {/*      src="/images/slide13.png"*/}
        {/*      alt="thank-you"*/}
        {/*      width="100%"*/}
        {/*      height="100%"*/}
        {/*    />*/}
        {/*    <HowToTitle>*/}
        {/*      {' '}*/}
        {/*      spread the word and if they can win, vote!*/}
        {/*    </HowToTitle>*/}
        {/*  </div>*/}
        {/*</HowTo>*/}
        {/*</SectionWrapper>*/}
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
};

export default MainWrapper;
