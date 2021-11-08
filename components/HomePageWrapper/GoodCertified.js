import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { H2 } from '../shared/typogrophy';

const Wrapper = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  text-align: center;
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 36px;
  margin: 24px 0;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  margin: 8px 0 12px;
`;

const CardContent = styled.div`
  text-align: left;
  font-size: 22px;
  line-height: 38px;
`;
const GoodCertified = () => {
  return (
    <Wrapper>
      <img src="https://assets.goodparty.org/homepage/certified.svg" />
      <Title>Good Certified candidates pledge to be:</Title>
      <Grid spacing={3} container>
        <Grid item xs={12} md={4}>
          <Card>
            <Img
              src="images/icons/certification-badge.svg"
              alt="tgp certified"
              width={60}
              height={60}
            />
            <CardContent>
              <CardTitle>Independent</CardTitle>
              They hold diverse beliefs across the political spectrum, but agree
              Red and Blue are NOT the answer. They pledge not to pay dues or
              fundraise for Democrats or Republicans.
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <Img
              src="images/icons/certification-badge.svg"
              alt="tgp certified"
              width={48}
              height={48}
            />
            <CardContent>
              <CardTitle>People Powered</CardTitle>
              They only accept donations from individuals – not from
              corporations, unions, PACs, or other non-living entities.
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <Img
              src="images/icons/certification-badge.svg"
              alt="tgp certified"
              width={60}
              height={60}
            />
            <CardContent>
              <CardTitle>Anti-Corruption</CardTitle>
              They openly share their public meeting calendars and advance the
              Anti-Corruption Act
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

GoodCertified.propTypes = {};

export default GoodCertified;
