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
  padding: 80px 20px 0;
  min-height: 70vh;
  background: url('https://assets.goodparty.org/homepage/top-section-bg.svg')
    top center no-repeat;
  background-size: 100% 100%;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const StyledH1 = styled(H1)`
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 42px;
    line-height: 48px;
  }
`;

const StyledH2 = styled(H2)`
  color: #fff;
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 42px;
    line-height: 48px;
  }

  .smaller {
    display: block;
    font-size: 38px;
    line-height: 33px;
    font-weight: 400;
    margin-top: 8px;
  }
`;

const Relative = styled.div`
  position: relative;
  text-align: center;
`;

const SoFarWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 349px;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 64px;
  font-weight: 700;
`;

const SoFarText = styled.div`
  font-size: 38px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.purple};
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
        <Grid item xs={12} md={6}>
          <StyledH2>
            Together<span className="smaller">we can change the game.</span>
          </StyledH2>
        </Grid>
        <Grid item xs={12} md={6} className="text-center">
          <Relative>
            <Image
              src="https://assets.goodparty.org/homepage/blank-heart.svg"
              width="424"
              height="349"
            />
            <SoFarWrapper>
              {numberFormatter(soFar)}
              <br />
              <SoFarText>so far!</SoFarText>
            </SoFarWrapper>
          </Relative>
          <br />
          <Link href="/register" passHref>
            <a>
              <PurpleButton style={{ width: '424px' }}>
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
        </Grid>
      </Grid>
    </Wrapper>
  );
};

Hero.propTypes = {
  soFar: PropTypes.number,
};

export default Hero;
