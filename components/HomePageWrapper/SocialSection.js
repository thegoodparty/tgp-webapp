import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import { Link } from 'react-scroll';

import { numberFormatter } from '/helpers/numberHelper';
import Row from '../shared/Row';

const Wrapper = styled.section`
  padding-bottom: 130px;
`;

const TopRow = styled.div`
  display: block;
  margin-bottom: 30px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Stat = styled.div`
  margin-right: 70px;
  margin-bottom: 40px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    margin-bottom: 0;
  }
`;
const Icon = styled.div`
  font-size: 40px;
  margin-right: 16px;
`;
const Count = styled.div`
  font-size: 48px;
  font-weight: 900;
`;
const Label = styled.div`
  font-size: 19px;
  font-weight: 900;
`;

const ScrollLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

const ResponsiveRow = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    align-items: center;
  }
`;

const stats = [
  { label: '#goodparty posts', count: '146123', icon: <>😁</> },
  { label: '#goodparty hosts', count: '621', icon: <>🎉</> },
];

const SocialSection = () => {
  return (
    <Wrapper>
      <TopRow>
        <ResponsiveRow>
          {stats.map((stat) => (
            <Stat key={stat.label}>
              <Icon>{stat.icon}</Icon>
              <div>
                <Count>{numberFormatter(stat.count)}</Count>
                <Label>{stat.label}</Label>
              </div>
            </Stat>
          ))}
        </ResponsiveRow>
        <Link to="accomplish" duration={350} smooth>
          <ScrollLink>What does partying accomplish?</ScrollLink>
        </Link>
      </TopRow>
      <Grid container spacing={8} className="text-center">
        <Grid item xs={12} lg={4}>
          <Image src="/images/homepage/social1.jpg" height={615} width={369} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Image src="/images/homepage/social2.jpg" height={615} width={369} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Image src="/images/homepage/social3.jpg" height={615} width={369} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SocialSection;
