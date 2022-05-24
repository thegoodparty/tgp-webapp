import React from 'react';
import styled from 'styled-components';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import { Link as ScrollLink } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import MaxWidth from '../shared/MaxWidth';
import VideoSection from './VideoSection';

const Wrapper = styled.section`
  background-color: #f3f3f3;
  padding: 80px 24px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 116px 24px;
  }
`;

const H2 = styled.h2`
  margin: 0 0 40px;
  font-size: 42px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 64px;
  }
`;

const Relative = styled.div`
  display: inline-block;
  position: relative;
`;

const Up = styled.span`
  z-index: 10;
  position: relative;
`;

const Yellow = styled.div`
  position: absolute;
  height: 20px;
  width: calc(100% + 10px);
  bottom: 0;
  left: -5px;
  background-color: #ffe600;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    bottom: 10px;
    height: 28px;
  }
`;

const LinkScroll = styled.div`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 900;
`;

const Accomplish = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const GrayParty = ({ openModalCallback }) => {
  return (
    <Wrapper>
      <MaxWidth>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <VideoSection />
          </Grid>
          <Grid item xs={12} lg={6}>
            <H2 data-cy="party-on">
              We party on{' '}
              <Relative>
                <Up>Tuesdays.</Up>
                <Yellow />
              </Relative>
              <br />
              Because{' '}
              <ScrollLink
                className="pointer"
                to="what-is-it"
                duration={350}
                smooth
                offset={-90}
              >
                <u>
                  <i>It</i>
                </u>
              </ScrollLink>{' '}
              doesn’t want us to.
            </H2>
            <BlackButton onClick={openModalCallback}>
              <InnerButton style={{ padding: '0 80px' }}>
                Count me in!
              </InnerButton>
            </BlackButton>
            <Accomplish>
              <ScrollLink to="accomplish" duration={350} smooth offset={-90}>
                <LinkScroll data-cy="accomplish-label">What does partying accomplish?</LinkScroll>
              </ScrollLink>
            </Accomplish>
          </Grid>
        </Grid>
      </MaxWidth>
    </Wrapper>
  );
};

export default GrayParty;
