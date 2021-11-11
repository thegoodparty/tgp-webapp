import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Link from 'next/link';

import { H1, H2 } from '../shared/typogrophy';
import { numberFormatter } from '../../helpers/numberHelper';
import { PurpleButton } from '../shared/buttons';

const Wrapper = styled.div`
  padding: 20px 8px 0;
  min-height: 70vh;
  background: url('/images/homepage/hero-bg-small.svg') center 35% no-repeat;
  background-size: contain;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    background: url('/images/homepage/top-section-purple-bg.png') top center
      no-repeat;
    background-size: 100% 100%;
    padding: 80px 20px 0;
    min-height: 70vh;
  }
`;

const StyledH1 = styled(H1)`
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
    font-size: 42px;
    line-height: 48px;
    margin-bottom: 0;
  }
`;

const StyledH2 = styled.h2`
  color: #fff;
  font-size: 42px;
  line-height: 36px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
    line-height: 48px;
  }

  .smaller {
    display: block;
    font-size: 28px;
    line-height: 33px;
    font-weight: 400;
    margin-top: 8px;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      font-size: 38px;
      line-height: 33px;
    }
  }
`;

const Relative = styled.div`
  position: relative;
  text-align: center;
`;

const SoFarWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 40px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 64px;
  }
`;

const Heart = styled.img`
  width: 80%;
  height: auto;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 424px;
    height: 349px;
  }
`;

const SoFarText = styled.div`
  font-size: 28px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.purple};
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 38px;
  }
`;

const ButtonWrapper = styled.div`
  max-width: 424px;
  margin: 0 auto;
`;
const Hero = ({ soFar = 1234567 }) => {
  return (
    <Wrapper>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <StyledH1>
            Money has corrupted
            <br />
            <span className="purple-text">
              <i>both</i>
            </span>{' '}
            major parties
          </StyledH1>
        </Grid>
        <Grid item xs={12} lg={6}>
          <StyledH2>
            Together<span className="smaller">we can change the game.</span>
          </StyledH2>
        </Grid>
        <Grid item xs={12} lg={6} className="text-center">
          <Relative>
            <Heart src="/images/homepage/thick-heart.svg" />
            <SoFarWrapper>
              {numberFormatter(soFar)}
              <br />
              <SoFarText>so far!</SoFarText>
            </SoFarWrapper>
          </Relative>
          <br />
          <ButtonWrapper>
            <Link href="/register" passHref>
              <a>
                <PurpleButton fullWidth>
                  <Image
                    src="/images/white-heart.svg"
                    style={{
                      marginRight: '8px',
                    }}
                    width={24}
                    height={18}
                  />
                  &nbsp; Count me in
                </PurpleButton>
              </a>
            </Link>
          </ButtonWrapper>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Hero.propTypes = {
  soFar: PropTypes.number,
};

export default Hero;
