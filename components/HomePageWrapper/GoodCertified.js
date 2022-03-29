import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { GOOD_CERTIFIED } from '../../utils/constants';

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

const CretifiedImg = styled.img`
  position: relative;
  z-index: 10;
`;

const TitleWrapper = styled.div`
  position: relative;
  background: url('/images/homepage/good-certified-bg-small.svg') center center
    no-repeat;
  background-size: 100% 100%;
  margin-top: -100px;
  margin-bottom: 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    background: none;
    margin-top: 0;
    margin-bottom: 0;
  }
  .hidden {
    opacity: 0;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      display: none;
    }
  }
`;

const Title = styled.h2`
  font-size: 22px;
  margin: 24px 0;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 36px;
    color: #000;
    padding: 0;
    position: static;
    display: block;
    height: unset;
  }
`;

const Card = styled.div`
  display: flex;
`;

const CardTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0 12px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 32px;
  }
`;

const CardsWrapper = styled.div`
  padding: 0 16px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 0;
  }
`;

const CardContent = styled.div`
  text-align: left;
  font-size: 16px;
  line-height: 26px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 22px;
    line-height: 38px;
  }
`;

const GoodCertified = () => {
  return (
    <Wrapper>
      <CretifiedImg src="/images/homepage/certified.png" data-cy="gc-image" />
      <TitleWrapper>
        <Title data-cy="gc-title">Good Certified candidates pledge to be:</Title>
        <img
          src="/images/homepage/good-certified-bg-small.svg"
          className="hidden full-image"
        />
      </TitleWrapper>
      <CardsWrapper>
        <Grid spacing={3} container>
          {GOOD_CERTIFIED.map(item => (
            <Grid item xs={12} lg={4} key={item.title} data-cy="gc-item">
              <Card>
                <Img
                  src="images/icons/certification-badge.svg"
                  alt="tgp certified"
                  width={48}
                  height={48}
                  data-cy="gc-item-img"
                />
                <CardContent data-cy="gc-item-content">
                  <CardTitle data-cy="gc-item-title">{item.title}</CardTitle>
                  {item.description}
                </CardContent>
              </Card>
            </Grid>
          ))}

        </Grid>
      </CardsWrapper>
    </Wrapper>
  );
};

GoodCertified.propTypes = {};

export default GoodCertified;
