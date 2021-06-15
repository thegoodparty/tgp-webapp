/**
 *
 * GoodPracticesWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-scroll';
import { Element } from 'react-scroll';
import { AiOutlineYoutube } from 'react-icons/ai';

import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import PageWrapper from '../shared/PageWrapper';
import { Body11, Body13, H1, H2, H3 } from '../shared/typogrophy';
import VideoModal from './VideoModal';

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
  padding: 0 32px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.contentMax}) {
    padding: 0;
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

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 60px;
`;

const VideoImg = styled.img`
  box-shadow: -3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    3.62699px -3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    -3.62699px -3.62699px 9.06748px rgba(255, 255, 255, 0.9),
    3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.9),
    inset 1.8135px 1.8135px 1.8135px rgba(255, 255, 255, 0.3),
    inset -1.8135px -1.8135px 1.8135px rgba(224, 212, 234, 0.5);
  border-radius: 12px;
  margin-top: 12px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 24px;
  }
`;

const VideoOverlay = styled.div`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.purple3};
  box-shadow: -3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    3.62699px -3.62699px 9.06748px rgba(224, 212, 234, 0.2),
    -3.62699px -3.62699px 9.06748px rgba(255, 255, 255, 0.9),
    3.62699px 3.62699px 9.06748px rgba(224, 212, 234, 0.9),
    inset 1.8135px 1.8135px 1.8135px rgba(255, 255, 255, 0.3),
    inset -1.8135px -1.8135px 1.8135px rgba(224, 212, 234, 0.5);
  width: 90%;
  position: absolute;
  bottom: 0px;
  left: 5%;
  padding: 24px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 42px 24px;
  }
`;

const Watch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray7};
  margin-top: 12px;
  font-size: 13px;
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 24px;
    font-size: 18px;
  }
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

function GoodPracticesWrapper({ content }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  return (
    <PageWrapper purple purpleNav isFullWidth>
      <Inner>
        <HeaderWrapper>
          <StyledH1>{content.title}</StyledH1>
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
            <H3>Announcement Video:</H3>
          </CmsContentWrapper>
        </Wrapper>
        {content.video && (
          <Wrapper className="no-sm-padding">
            <VideoWrapper>
              <VideoImg
                src={content.videoImage}
                alt="Video"
                className="full-image"
              />
              <VideoOverlay>
                <H3>Learn how to launch with Good Party 🤳</H3>
                <Watch
                  onClick={() => {
                    setShowVideoModal(true);
                  }}
                >
                  <AiOutlineYoutube size={28} /> &nbsp;&nbsp;
                  <div>Watch now</div>
                </Watch>
              </VideoOverlay>
            </VideoWrapper>
          </Wrapper>
        )}
        <Wrapper>
          <CmsContentWrapper>
            {contentfulHelper(content.videoText)}
            <Element name="grow">
              <StyledH2>Grow</StyledH2>
            </Element>
            <div style={{ paddingTop: '1px' }}>
              {contentfulHelper(content.grow)}
            </div>

            <Element name="win">
              <StyledH2>Win</StyledH2>
            </Element>
            <div style={{ paddingTop: '1px' }}>
              {contentfulHelper(content.win)}
            </div>
          </CmsContentWrapper>
        </Wrapper>
      </Inner>
      {showVideoModal && (
        <VideoModal
          closeModalCallback={() => setShowVideoModal(false)}
          url={content.video}
        />
      )}
    </PageWrapper>
  );
}

GoodPracticesWrapper.propTypes = {
  content: PropTypes.object,
};

export default GoodPracticesWrapper;
