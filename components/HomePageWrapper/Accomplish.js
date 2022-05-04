import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Image from 'next/image';
import { Element } from 'react-scroll';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';

const Wrapper = styled.section`
  padding: 80px 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 130px 0;
  }
`;

const H2 = styled.h2`
  font-size: 42px;
  font-weight: 900;
  margin: 0 0 30px;
  line-height: 48px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 54px;
    line-height: 59px;
  }
`;

const Manifesto = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 24px;
  text-decoration: underline;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin: 34px 0 12px;
`;

const WeCan = styled.div`
  margin: 34px 0 22px;
  font-size: 24px;
  font-weight: 900;
`;

const Accomplish = ({openModalCallback}) => {
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <Image src="/images/homepage/party.jpg" height={779} width={624} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Element name="accomplish">
            <H2>What does partying accomplish?</H2>
          </Element>
          <div>
            <Title>FUN with FRIENDS</Title>
            Partying brings us together with friends for fun! Isn’t that the
            purpose of life?
            <Title>LIFE, LIBERTY & PURSUIT OF HAPPINESS</Title>
            Partying flexes and grows our most basic right of assembly in
            funnest way possible.
            <Title>#GOODPARTY is the PURPOSE</Title>
            Partying together, everywhere shows and grows our power to unite
            around something positive.
          </div>
          <WeCan>Then, WE CAN...</WeCan>
          <div style={{ display: 'inline-block' }}>
            <BlackButton onClick={openModalCallback}>
              <InnerButton style={{ textTransform: 'none', padding: '0 80px' }}>
                Host a #goodparty
              </InnerButton>
            </BlackButton>
            <Link href="/manifesto" passHref>
              <a>
                <Manifesto>read our Manifesto</Manifesto>
              </a>
            </Link>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Accomplish;
