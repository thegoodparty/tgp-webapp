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

const Coming = styled.span`
  color: #8f8f8f;
  font-size: 19px;
  margin-left: 8px;
  display: inline-block;
  text-decoration: underline;
  font-weight: 400;
  cursor: pointer;
`;

const SocialSection = ({ openModalCallback }) => {
  return (
    <Wrapper>
      <TopRow>
        <Row>
          <a
            href="https://www.tiktok.com/tag/goodparty?lang=en"
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            <Stat style={{ marginRight: '70px', display: 'flex' }}>
              <Icon>😁</Icon>
              <div>
                <Count>146,123 </Count>
                <Label>#goodparty posts</Label>
              </div>
            </Stat>{' '}
          </a>

          <Stat style={{ display: 'flex' }}>
            <Icon>🎉</Icon>
            <div>
              <Count>
                0 <Coming onClick={openModalCallback}>Coming Soon</Coming>
              </Count>
              <Label>#goodparty posts</Label>
            </div>
          </Stat>
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
