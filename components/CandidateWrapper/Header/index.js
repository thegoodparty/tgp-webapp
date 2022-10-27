/**
 *
 * Header
 *
 */

import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { IoShareOutline } from 'react-icons/io';

import CandidateProfile from './CandidateProfile';
import TopIssuesPills from './TopIssuesPills';
import SocialStats from './SocialStats';
import LoadingAnimation from '../../shared/LoadingAnimation';
import { CandidateWrapperContext } from '../index';



const Wrapper = styled.header`
  padding: 35px 0 60px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 55px 0 70px;
  }
`;

function Header() {
  const { showShareModalCallback } = useContext(CandidateWrapperContext);
  return (
    <Wrapper>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <CandidateProfile showShareModalCallback={showShareModalCallback} />
          <TopIssuesPills />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SocialStats />
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Header;
