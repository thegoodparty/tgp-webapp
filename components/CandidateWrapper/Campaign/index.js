/**
 *
 * Campaign
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TopIssues from '../Feed/TopIssues';
import DateBox from './DateBox';
import CampaignProgress from './CampaignProgress';
import Endorsements from './Endorsements';

const Wrapper = styled.section``;

function Campaign() {
  return (
    <Wrapper>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={4}>
          <DateBox />
          <CampaignProgress />
          <DateBox showPast />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Endorsements />
        </Grid>
        <Grid item xs={0} lg={4}>
          <Hidden mdDown>
            <TopIssues />
          </Hidden>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Campaign;
