/**
 *
 * MainWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PurpleButton } from 'components/shared/buttons';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import NotFound from 'containers/shared/NotFoundPage';
import ReactPlayer from 'react-player/lazy';
import ProfileInfo from './ProfileInfo';
import { H3, H1, Body19, Body13, Body11 } from '../../shared/typogrophy';
import ComparedCandidateCarousel from './ComparedCandidateCarousel';
import RecentlyJoined from './RecentlyJoined';
const ShareIconPurple = '/images/purple-share.svg';
const HeartIconWhite = '/images/white-heart.svg';
const SectionWrapper = styled.div`
  margin-top: 48px;
  padding: 0 18px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 36px;
  }
`;

const CampaignSummaryHeadLine = styled(H1)`
  margin-top: 64px;
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

const InnerButton = styled.div`
  font-size: 11px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
  }
`;

const LargeOnly = styled.span`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline;
  }
`;

const Img = styled.img`
  top: 4px;
  position: relative;
  height: 16px;
  margin-right: 10px;
  &.heart {
    top: 4px;
    width: 24px;
  }
`;
const SocialLink = styled.a`
  margin-right: 25px;

`;
const HowTo = styled.div`
  padding-right: 90px;
  padding-left: 90px;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-right: 18px;
    padding-left: 18px;
  }
  & > div {
    text-align: center;
    margin-top: 50px;
    img {
      padding-bottom: 20px;
    }
  }
`;

const YoutubePlayer = styled(ReactPlayer)`
  width: unset !important;
`;

const YoutubePlayerWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const HowToTitle = styled(H3)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.purple};
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
function MainWrapper({ candidate, endorseCallback }) {
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
            url={`https://youtu.be/${heroVideo}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
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
      <SectionWrapper style={{ marginTop: !heroVideo && 0 }}>
        <CampaignSummaryHeadLine style={{ marginTop: !heroVideo && 0 }}>
          Help {firstName} {lastName} take back {city}
        </CampaignSummaryHeadLine>
        <SectionContent dangerouslySetInnerHTML={{ __html: campaignSummary }} />
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>About</SectionHeader>
        <SectionContent dangerouslySetInnerHTML={{ __html: about }} />
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>Compare Candidates</SectionHeader>
        <ComparedCandidateCarousel candidates={comparedCandidates.candidates} />
      </SectionWrapper>
      <SectionWrapper>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <PurpleButton fullWidth onClick={endorseCallback}>
              <InnerButton>
                <Img src={HeartIconWhite} alt="share" />
                <span>ADD YOUR NAME</span>
              </InnerButton>
            </PurpleButton>
          </Grid>
          <Grid item xs={6}>
            <PurpleButton fullWidth className="outline">
              <InnerButton>
                <Img src={ShareIconPurple} alt="share" />
                <span>
                  SHARE <LargeOnly>CAMPAIGN</LargeOnly>
                </span>
              </InnerButton>
            </PurpleButton>
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
        <div style={{ textAlign: 'center' }}>
          <PurpleButton
            className="outline"
            style={{ paddingRight: 60, paddingLeft: 60 }}
          >
            <InnerButton>
              <span>READ MORE UPDATES</span>
            </InnerButton>
          </PurpleButton>
        </div>
      </SectionWrapper>
      <Hidden smUp>
        <SectionWrapper>
          <RecentlyJoined />
        </SectionWrapper>
      </Hidden>
      <SectionWrapper>
        <SectionHeader className="center">
          How The Good Party Works <br />
          <span>We make votes matter more than money</span>
        </SectionHeader>
        <HowTo>
          <div>
            <img
              src="/images/thank-you.png"
              alt="thank-you"
              width="100%"
              height="100%"
            />
            <HowToTitle>
              {' '}
              See Good Candidates challenging THE status quo
            </HowToTitle>
          </div>
          <div>
            <img
              src="/images/slide12.png"
              alt="thank-you"
              width="100%"
              height="100%"
            />
            <HowToTitle>
              {' '}
              Add your vote to their crowd-voting campaigns
            </HowToTitle>
          </div>
          <div>
            <img
              src="/images/slide13.png"
              alt="thank-you"
              width="100%"
              height="100%"
            />
            <HowToTitle> spread the word and if they can win, vote!</HowToTitle>
          </div>
        </HowTo>
      </SectionWrapper>
    </>
  );
}

MainWrapper.propTypes = {
  candidate: PropTypes.object,
  endorseCallback: PropTypes.func,
};

export default MainWrapper;
