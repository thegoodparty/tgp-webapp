import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import StyledH2 from './StyledH2';
import GrayText from './GrayText';
import SectionImg from './SectionImg';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 32px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 64px;
  }
`;

const StyledH1 = styled.h1`
  color: #000;
  font-size: 27px;
  line-height: 35px;
  font-weight: 700;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 48px;
    line-height: 52px;
  }
`;

const Logo = styled.img`
  width: 56px;
  height: auto;
  margin-left: 14px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 24px;
    width: 45px;
  }
`;

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row-reverse;
  }
`;

const TopSection = () => {
  return (
    <>
      <Row>
        <StyledH1>Free software for free elections</StyledH1>
        <Logo src="/images/icons/heart.svg" />
      </Row>
      <ReverseGrid container spacing={5} alignItems="center">
        <Grid item xs={12} md={6}>
          <SectionImg
            src="images/homepage/capitol.png"
            alt="broken democracy"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledH2>Our democracy is broken</StyledH2>
        </Grid>
      </ReverseGrid>
    </>
  );
};

export default TopSection;
