/**
 *
 * Header
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { CandidateContext } from '/containers/CandidatePage';
import CandidateProfile from './CandidateProfile';
import TopIssues from './TopIssues';
import SocialStats from './SocialStats';

const Wrapper = styled.header`
  padding: 35px 0 60px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 55px 0 70px;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <CandidateProfile />
          <TopIssues />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SocialStats />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Header;
