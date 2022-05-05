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
  margin-bottom: 24px;
  display: flex;
  color: #000;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-bottom: 0;
  }
`;
const Icon = styled.div`
  font-size: 40px;
  margin-right: 16px;
`;
const Count = styled.div`
  font-size: 30px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 48px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 900;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 19px;
  }
`;

const ScrollLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  font-weight: 900;
`;

const Relative = styled.div`
  position: relative;
  display: inline-block;
`;

const Clickable = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  width: 100%;
  cursor: pointer;
`;

const stats = [
  { label: '#goodparty posts', count: '146123', icon: <>😁</> },
  { label: '#goodparty hosts', count: '621', icon: <>🎉</> },
];

const SocialSection = ({ openModalCallback }) => {
  return (
    <Wrapper>
      <TopRow>
        <Row>
          {stats.map((stat, index) => (
            <Stat
              key={stat.label}
              style={index === 0 ? { marginRight: '70px' } : {}}
            >
              <Icon>{stat.icon}</Icon>
              <div>
                <Count>{numberFormatter(stat.count)}</Count>
                <Label>{stat.label}</Label>
              </div>
            </Stat>
          ))}
        </Row>
        <Link to="accomplish" duration={350} smooth>
          <ScrollLink>What does partying accomplish?</ScrollLink>
        </Link>
      </TopRow>
      <Grid container spacing={8} className="text-center">
        <Grid item xs={12} lg={4}>
          <Relative>
            <Image
              src="/images/homepage/social1.jpg"
              height={615}
              width={369}
            />
            <Clickable onClick={openModalCallback} />
          </Relative>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Relative>
            <Image
              src="/images/homepage/social2.jpg"
              height={615}
              width={369}
            />
            <Clickable onClick={openModalCallback} />
          </Relative>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Relative>
            <Image
              src="/images/homepage/social3.jpg"
              height={615}
              width={369}
            />
            <Clickable onClick={openModalCallback} />
          </Relative>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SocialSection;
