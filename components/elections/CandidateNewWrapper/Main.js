/**
 *
 * MainWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PurpleButton } from 'components/shared/buttons';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import NotFound from 'containers/shared/NotFoundPage';
import ReactPlayer from 'react-player/lazy';
import articlesHelper from 'helpers/articlesHelper';
import PageWrapper from '../../shared/PageWrapper';
import ProfileInfo from './ProfileInfo';
import { H3, H1, Body19, Body13, Body11 } from '../../shared/typogrophy';
import CompareCandidate from './CompareCandidate.js';
import RecentlyJoined from './RecentlyJoined';
const ShareIconPurple = '/images/purple-share.svg';
const HeartIconWhite = '/images/white-heart.svg';
const CarouselPrevIcon = '/images/carousel-prev.png';
const CarouselNextIcon = '/images/carousel-next.png';
const SectionWrapper = styled.div`
  margin-top: 64px;
  span.carousel-prev {
    position: absolute;
    // top: 180px;
    height: 100%;
    left: 0;
    cursor: pointer;
    z-index: 1000;
    img {
      margin-top: 180px;
    }
  }
  span.carousel-next {
    position: absolute;
    // top: 180px;
    height: 100%;
    right: -40px;
    cursor: pointer;
    z-index: 1000;
    img {
      margin-top: 180px;
    }
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
  &.center {
    color: ${({ theme }) => theme.colors.gray70};
    text-align: center;
  }
  span {
    font-size: 16px;
    font-weight: normal;
  }
`;

const SectionContent = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
`;

const InnerButton = styled.div`
  font-size: 14px;
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
  img {
    margin-top: 15px;
  }
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

const ComparedCandidateWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
 
`;
const ComparedCandidateCarousel = styled(Grid)`
  && {
    width: 10000px;
    flex-wrap: nowrap;
    padding-left: 27px;
  }
`;

function MainWrapper({ candidate }) {
  if (!candidate) {
    return <NotFound />;
  }
  const [carouselPos, setCarouselPos] = useState(0);
  const {
    firstName,
    lastName,
    campaignSummary,
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
  console.log('after', candidate.comparedCandidates);
  const candidates = [
    ...comparedCandidates.candidates,
    ...comparedCandidates.candidates,
  ];
  console.log(carouselPos);
  return (
    <>
      {heroVideo && (
        <YoutubePlayer
          url={`https://youtu.be/${heroVideo}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
          playing={false}
        />
      )}
      <Hidden smUp>
        <ProfileInfo candidate={candidate} isMobile />
      </Hidden>
      <SectionWrapper>
        <CampaignSummaryHeadLine>
          Help {firstName} {lastName} take back Los Angeles city hall
        </CampaignSummaryHeadLine>
        <SectionContent dangerouslySetInnerHTML={{ __html: campaignSummary }} />
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>About</SectionHeader>
        <SectionContent dangerouslySetInnerHTML={{ __html: about }} />
      </SectionWrapper>
      <SectionWrapper style={{ marginRight: 30, position: 'relative' }}>
        <SectionHeader>Compare Candidates</SectionHeader>
        {carouselPos > 0 &&
          <span
            className="carousel-prev"
            onClick={() => setCarouselPos(carouselPos - 1)}
          >
            <img src={CarouselPrevIcon} alt="carousel-prev" />
          </span>
        }
        {carouselPos < candidates.length - 1 &&
          <span className="carousel-next" onClick={() => setCarouselPos(carouselPos + 1)}>
            <img src={CarouselNextIcon} alt="carousel-next" />
          </span>
        }
        <ComparedCandidateWrapper>
          <ComparedCandidateCarousel container>
            {candidates &&
              candidates.map((cand, index) => index >= carouselPos ? (
                <CompareCandidate candidate={cand} />
              ) : (
                  <></>
                ),
              )}
          </ComparedCandidateCarousel>
        </ComparedCandidateWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <PurpleButton fullWidth className="outline">
              <InnerButton>
                <Img src={ShareIconPurple} alt="share" />
                <span>SHARE</span>
              </InnerButton>
            </PurpleButton>
          </Grid>
          <Grid item xs={12} sm={5}>
            <PurpleButton fullWidth>
              <InnerButton>
                <Img src={HeartIconWhite} alt="share" />
                <span>ENDORSE</span>
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
              <img src="/images/icons/facebook-icon.svg" alt="facebook" />
            </SocialLink>
          )}
          {twitter && (
            <SocialLink href={twitter}>
              <img src="/images/icons/twitter-icon.svg" alt="twitter" />
            </SocialLink>
          )}
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>Updates({updates.length})</SectionHeader>
        {updates.map((update, index) => (
          <React.Fragment key={index}>
            <UpdatedDate>August 4, 2020</UpdatedDate>
            <UpdatedBy>by Cameron Sadeghi, The Good Party</UpdatedBy>
            <SectionContent
              dangerouslySetInnerHTML={{ __html: update }}
              style={{ marginBottom: 20 }}
            />
          </React.Fragment>
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
};

export default MainWrapper;
