import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import StyledH2 from './StyledH2';
import StyledH3 from './StyledH3';

const Img = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: -36px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    max-width: unset;
  }
`;

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
  }
`;
const Content = styled.div`
  max-width: 524px;
  margin: 0 auto;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: left;
    max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  }
`;

const Section1 = styled.div`
  background: linear-gradient(0deg, #f2e7ff, #f2e7ff),
    linear-gradient(
      257.82deg,
      rgba(67, 0, 211, 0.25) -11.17%,
      rgba(67, 0, 211, 0) 96.34%
    ),
    #5c00c7;
  padding: 32px;
`;

const Section2 = styled.div`
  background-color: #e9d7ff;
  padding: 32px;
`;
const Section3 = styled.div`
  background-color: #e7d2ff;
  padding: 32px;
`;

const TextWrapper = styled.div`
  padding-left: 48px;
`;

const Title = styled.div`
  font-size: 27px;
  line-height: 35px;
  color: ${({ theme }) => theme.colors.gray2};
  font-weight: 700;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 33px;
    line-height: 43px;
  }
`;

const Description = styled.div`
  font-size: 19px;
  line-height: 25px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray4};

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 27px;
    line-height: 32px;
  }
`;

const HowItWorksSection = () => {
  const router = useRouter();
  return (
    <>
      <div className="text-center">
        <StyledH2>How it works</StyledH2>
        <StyledH3>
          Crowd campaigns can make votes matter more than money in our
          elections!
        </StyledH3>
      </div>
      <Section1>
        <Content>
          <ReverseGrid
            container
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} md={9}>
              <TextWrapper>
                <Title>Launch</Title>
                <Description>
                  Candidates become{' '}
                  <Link
                    href={`${router.asPath}?article=1ic6T6fhH0jZLNvX5aZkDe`}
                    passHref
                  >
                    <a>Good Certified</a>
                  </Link>{' '}
                  and launch a free crowd-voting campaign page
                </Description>
              </TextWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Img src="images/homepage/launch.svg" alt="Launch" />
            </Grid>
          </ReverseGrid>
        </Content>
      </Section1>
      <Section2>
        <Content>
          <ReverseGrid
            container
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} md={9}>
              <TextWrapper>
                <Title>Grow</Title>
                <Description>
                  Campaign supporters endorse and share the campaign with
                  friends to build momentum
                </Description>
              </TextWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Img src="images/homepage/grow.svg" alt="Launch" />
            </Grid>
          </ReverseGrid>
        </Content>
      </Section2>
      <Section3>
        <Content>
          <ReverseGrid
            container
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} md={9}>
              <TextWrapper>
                <Title>Win</Title>
                <Description>
                  Good Party tools guide supporters through election day to get
                  out the vote and win!
                </Description>
              </TextWrapper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Img src="images/homepage/win.svg" alt="Launch" />
            </Grid>
          </ReverseGrid>
        </Content>
      </Section3>
    </>
  );
};

export default HowItWorksSection;
