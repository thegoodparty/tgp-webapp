import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Body19, Subtitle } from 'components/shared/typogrophy';

const ColTitle = styled(Subtitle)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.orange};
  text-align: center;
`;
const ColDescription = styled(Body19)`
  font-weight: bold;
  text-align: center;
  white-space: pre-line;
`;
const StatsSection = ({}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <ColTitle>99%</ColTitle>
        <ColDescription>
          of members of Congress <br /> recieve a <u>majority</u> of funding{' '}
          <br /> from big-money sources
        </ColDescription>
      </Grid>
      <Grid item xs={12} md={4}>
        <ColTitle>only 18%</ColTitle>
        <ColDescription>
          of Americans <br /> approve of Congress <br /> (but nothing changes)
        </ColDescription>
      </Grid>
      <Grid item xs={12} md={4}>
        <ColTitle>over 90%</ColTitle>
        <ColDescription>
          of Congress gets <br /> reelected based on <br /> amount of funds
          raised
        </ColDescription>
      </Grid>
    </Grid>
  );
};

export default StatsSection;
