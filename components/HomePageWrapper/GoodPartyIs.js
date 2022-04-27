import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
// import heart from '/images/heart.svg'

import MaxWidth from '/components/shared/MaxWidth';
import { Blue, Red } from './Hero';

const Section = styled.section`
  padding: 60px 24px;
`;

const H3 = styled.h3`
  margin: 0 0 45px;
  font-size: 28px;
  line-height: 53px;
  font-weight: 900;
`;

const Text = styled.div`
  font-size: 24px;
  line-height: 36px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding-right: 50px;
  }
`;

const HeartWrapper = styled.div`
  position: relative;
  text-align: center;
  height: 100%;
  min-height: 150px;
  background: url(/images/heart.svg) center center no-repeat;
  background-size: contain;
`;

const GoodPartyIs = () => {
  return (
    <Section>
      <MaxWidth>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <H3>Good Party is...</H3>
            <Text>
              <strong>For people,</strong> not money 💰 <br />
              <strong>For people,</strong> not <Red>red</Red> and{' '}
              <Blue>blue</Blue>
              <br />
              <strong>For people,</strong> not the machine 🤖
              <br />
              <br />
              Good Party is for the 130 million people across the political
              spectrum who want a <strong>real democracy!</strong>
            </Text>
          </Grid>
          <Grid item xs={12} md={4}>
            <HeartWrapper>
              {/*<Image*/}
              {/*  src="/images/heart.svg"*/}
              {/*  layout="fill"*/}
              {/*  className="full-image"*/}
              {/*/>*/}
            </HeartWrapper>
          </Grid>
        </Grid>
      </MaxWidth>
    </Section>
  );
};

export default GoodPartyIs;
