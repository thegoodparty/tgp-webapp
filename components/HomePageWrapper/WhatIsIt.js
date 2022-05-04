import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const Wrapper = styled.section`
  padding: 130px 0;
  font-size: 48px;
`;

const H2 = styled.h2`
  font-size: 80px;
  font-weight: 900;
  margin: 0 0 60px;
`;

const H3 = styled.h3`
  font-size: 48px;
  font-weight: 900;
  margin: 0 0 10px;
`;

const Manifesto = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  text-decoration: underline;
`;

const WhatIsIt = () => {
  return (
    <Wrapper>
      <H2>
        What is{' '}
        <u>
          <i>it</i>
        </u>{' '}
        ?
      </H2>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={4}>
          <H3>
            <u>
              <i>It</i>
            </u>{' '}
            is the system
          </H3>
          that tears away our hopes
        </Grid>
        <Grid item xs={12} lg={4}>
          <H3>
            <u>
              <i>It</i>
            </u>{' '}
            is the duopoly
          </H3>
          that fights to keep us divided
        </Grid>
        <Grid item xs={12} lg={4}>
          <H3>
            <u>
              <i>It</i>
            </u>{' '}
            is the rat race
          </H3>
          that consumes our lives
        </Grid>
      </Grid>
      <Link href="/manifesto" passHref>
        <a>
          <Manifesto>read our Manifesto</Manifesto>
        </a>
      </Link>
    </Wrapper>
  );
};

export default WhatIsIt;
