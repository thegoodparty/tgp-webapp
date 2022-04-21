import React, { useContext } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { FontH1 } from '../shared/typogrophy';
import MaxWidth from '/components/shared/MaxWidth';
import { numberFormatter } from '../../helpers/numberHelper';
import { HomePageContext } from '../../containers/HomePage';
import BlackButton from '../shared/buttons/BlackButton';

const Section = styled.section`
  padding: 80px 16px 130px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding-bottom: 0;
  }
`;

const H1 = styled(FontH1)`
  font-size: 48px;
  margin-bottom: 110px;
  margin-top: 0;
  i {
    font-weight: 600;
  }
`;

const Creating = styled.div`
  font-size: 20px;
  line-height: 33px;
  font-style: italic;
  font-weight: 600;
  display: inline-block;
  max-width: 350px;
  margin-bottom: 180px;
`;

const BottomText = styled.div`
  font-size: 24px;
  margin-bottom: 45px;
  line-height: 36px;

  strong {
    font-weight: 900;
  }
`;

export const Red = styled.span`
  color: #d71f28;
`;

export const Blue = styled.span`
  color: #0044c9;
`;

const HeartWrapper = styled.div`
  position: relative;
  text-align: center;
  min-height: 350px;
`;

const WithUsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 48px;
  font-weight: 900;
`;

const WithUsText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: -100px;
  width: 100%;
`;

const Hero = () => {
  const { engagements } = useContext(HomePageContext);
  return (
    <Section>
      <MaxWidth>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} lg={8}>
            <H1 data-cy="hero-title">
              Money has corrupted
              <br />
              <i>both</i> major parties.
            </H1>
            <Creating data-cy="hero-subtitle">
              We’re creating a simple, free way for people to help good,
              independent candidates run and win!
            </Creating>
            <BottomText data-cy="hero-bottom">
              <strong>130M+ of us</strong> don’t feel represented by{' '}
              <Red>Republicans</Red> or <Blue>Democrats</Blue>
            </BottomText>
            <BottomText style={{ display: 'inline-block', maxWidth: '620px' }} data-cy="hero-bottom1">
              <strong>But we don&apos;t know each other</strong> (and
              aren&apos;t organized, yet!){' '}
              <strong>
                So Good Party is building free tools and a community
              </strong>{' '}
              that mobilizes and votes differently
            </BottomText>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <HeartWrapper>
              <Image
                src="/images/homepage/thick-heart.svg"
                layout="fill"
                className="full-image"
                data-cy="hero-heart"
              />
              <WithUsWrapper data-cy="hero-engagement">
                {numberFormatter(engagements)}
                <br />
                <WithUsText>are with us!</WithUsText>
              </WithUsWrapper>
              <ButtonWrapper>
                <Link href="/register" passHref>
                  <a data-cy="hero-register">
                    <BlackButton
                      className="pill"
                      fullWidth
                      style={{ textTransform: 'none' }}
                    >
                      Count Me In!
                    </BlackButton>
                  </a>
                </Link>
              </ButtonWrapper>
            </HeartWrapper>
          </Grid>
        </Grid>
      </MaxWidth>
    </Section>
  );
};

export default Hero;
