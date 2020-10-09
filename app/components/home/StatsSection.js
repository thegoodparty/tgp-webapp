import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Body19, Subtitle } from 'components/shared/typogrophy';

const Wrapper = styled.div`
  margin-bottom: 48px;
`;
const ColTitle = styled(Subtitle)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.orange};
  text-align: center;
`;
const ColDescription = styled(Body19)`
  font-weight: bold;
  text-align: center;
  white-space: pre-line;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 23px;
    line-height: 30px;
  }
`;
const StatsSection = () => (
  <Wrapper>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <ColTitle>99%</ColTitle>
        <ColDescription>
          of Congress members
          <br />
          raise <u>majority</u> of funds
          <br />
          from big-money donors
        </ColDescription>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ColTitle>only 18%</ColTitle>
        <ColDescription>
          of Americans <br /> approve of Congress <br /> (but nothing changes)
        </ColDescription>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ColTitle>over 90%</ColTitle>
        <ColDescription>
          of Congress gets <br /> reelected based on <br /> amount of funds
          raised
        </ColDescription>
      </Grid>
    </Grid>
  </Wrapper>
);

export default StatsSection;
