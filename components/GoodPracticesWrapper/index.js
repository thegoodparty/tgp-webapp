/**
 *
 * GoodPracticesWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-scroll';
import { Element } from 'react-scroll';

import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import PageWrapper from '../shared/PageWrapper';
import { Body11, H1, H2 } from '../shared/typogrophy';

const Wrapper = styled.div`
  max-width: 712px; // 680 plus the 18*2 padding
  margin: 0 auto;
  padding: 0 18px 60px;
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
  @media only screen and (max-width: ${({ theme }) =>
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
  padding: 0 24px;
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

const Img = styled.img`
  height: 140px;
  width: auto;
`;

const StyledH2 = styled.div`
  margin: 48px 0 8px;
  font-weight: 700;
  font-size: 23px;
  line-height: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 28px;
    line-height: 36px;
    margin: 64px 0 12px;
  }
`;

function GoodPracticesWrapper({ content }) {
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
                  <div className="text-center">
                    <Img src="images/see-good-candidates.svg" alt="Launch" />
                  </div>
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
                  <div className="text-center">
                    <Img src="images/tell-others.svg" alt="Launch" />
                  </div>
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
                  <div className="text-center">
                    <Img src="images/join-campaigns.svg" alt="Launch" />
                  </div>
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
    </PageWrapper>
  );
}

GoodPracticesWrapper.propTypes = {
  content: PropTypes.object,
};

export default GoodPracticesWrapper;
