/**
 *
 * GoodPracticesWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-scroll';
import { Element } from 'react-scroll';

import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import PageWrapper from '../shared/PageWrapper';
import { Body11, H1, H3 } from '../shared/typogrophy';
import VideoModal from '../shared/VideoModal';
import VideoSection from './VideoSection';
import CopyCodeSection from './CopyCodeSection';

const Wrapper = styled.div`
  max-width: 712px; // 680 plus the 18*2 padding
  margin: 0 auto;
  padding: 0 18px;
  &.no-sm-padding {
    padding: 0;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      padding: 0 18px;
    }
  }
`;

const Inner = styled.div`
  background-color: ${({ theme }) => theme.colors.purple3};
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.purple};
`;

const StyledH1 = styled(H1)`
  color: #fff;
  background-color: ${({ theme }) => theme.colors.purple};
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 32px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 24px 0 48px;
  }
`;

const Box = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 18px;
  padding: 0 0 0 24px;
  border-radius: 8px;
  background-size: cover;
  background-position: left center;
  box-shadow: -6px 6px 18px rgba(224, 212, 234, 0.2),
    6px -6px 18px rgba(224, 212, 234, 0.2),
    -6px -6px 18px rgba(255, 255, 255, 0.9),
    6px 6px 18px rgba(224, 212, 234, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(224, 212, 234, 0.5);
`;
const BoxTitle = styled.div`
  font-size: 23px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.purple};
  font-weight: 700;
`;

const BoxText = styled(Body11)`
  color: #666;
  margin-top: 4px;
`;

const StyledH2 = styled.div`
  margin: 48px 0 8px;
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 28px;
    line-height: 36px;
    margin: 64px 0 12px;
  }
`;

const BgImg = styled.div`
  height: 160px;
  background-position: center right;
  background-size: contain;
  background-repeat: no-repeat;
`;

const LaunchBgImg = styled(BgImg)`
  background-image: url('images/good-practices/launch-bg-sm.svg');
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background-image: url('images/good-practices/launch-bg.svg');
  }
`;

const GrowBgImg = styled(BgImg)`
  background-image: url('images/good-practices/grow-bg-sm.svg');
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background-image: url('images/good-practices/grow-bg.svg');
  }
`;

const WinBgImg = styled(BgImg)`
  background-image: url('images/good-practices/win-bg-sm.svg');
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background-image: url('images/good-practices/win-bg.svg');
  }
`;

const UnderCodeWrapper = styled.div`
  margin-top: 36px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 48px;
  }
`;

function GoodPracticesWrapper({ content, candidates }) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <PageWrapper purple purpleNav isFullWidth>
      <Inner>
        <HeaderWrapper>
          <Wrapper>
            <StyledH1>{content.title}</StyledH1>
          </Wrapper>
        </HeaderWrapper>
        <Wrapper>
          <Link to="launch" duration={350} smooth>
            <Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <BoxTitle>Launch</BoxTitle>
                  <BoxText>
                    Our recommendations for launching your campaign
                  </BoxText>
                </Grid>
                <Grid item xs={6}>
                  <LaunchBgImg />
                </Grid>
              </Grid>
            </Box>
          </Link>
          <Link to="grow" duration={350} smooth>
            <Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <BoxTitle>Grow</BoxTitle>
                  <BoxText>How we can help you get more supporters</BoxText>
                </Grid>
                <Grid item xs={6}>
                  <GrowBgImg />
                </Grid>
              </Grid>
            </Box>
          </Link>
          <Link to="win" duration={350} smooth>
            <Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <BoxTitle>Win</BoxTitle>
                  <BoxText>Best practices for getting out the vote</BoxText>
                </Grid>
                <Grid item xs={6}>
                  <WinBgImg />
                </Grid>
              </Grid>
            </Box>
          </Link>
          <CmsContentWrapper>
            <Element name="launch">
              <StyledH2>Launch</StyledH2>
            </Element>
            <div style={{ paddingTop: '1px' }}>
              {contentfulHelper(content.launch)}
            </div>
            <H3>Announcement Video</H3>
          </CmsContentWrapper>
        </Wrapper>
        <VideoSection
          content={content}
          showVideoCallback={() => {
            setShowVideoModal(true);
          }}
        />

        <Wrapper>
          <CmsContentWrapper>
            {contentfulHelper(content.videoText)}
            <Element name="grow">
              <StyledH2>Grow</StyledH2>
            </Element>
            <div style={{ paddingTop: '1px' }}>
              {contentfulHelper(content.grow)}
            </div>
            <CopyCodeSection candidates={candidates} />

            <UnderCodeWrapper>
              {contentfulHelper(content.growUnderCodeSection)}
            </UnderCodeWrapper>
            <Element name="win">
              <StyledH2>Win</StyledH2>
            </Element>
            <div style={{ paddingTop: '1px' }}>
              {contentfulHelper(content.win)}
            </div>
          </CmsContentWrapper>
        </Wrapper>
        <div style={{ height: '60px' }} />
      </Inner>
      {showVideoModal && (
        <VideoModal
          closeModalCallback={() => setShowVideoModal(false)}
          url={
            content.youtubeId
              ? `https://www.youtube.com/watch?v=${content.youtubeId}?modestbranding=1`
              : content.video
          }
        />
      )}
    </PageWrapper>
  );
}

GoodPracticesWrapper.propTypes = {
  content: PropTypes.object,
  candidates: PropTypes.array,
};

export default GoodPracticesWrapper;
