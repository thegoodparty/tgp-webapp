/**
 *
 * Campaign
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { CandidateContext } from '/containers/CandidatePage';

import TopIssues from '../Feed/TopIssues';
import DateBox from './DateBox';
import CampaignProgress from './CampaignProgress';
import Endorsements from './Endorsements';
import { MdUpOnly } from '../../shared/navigation/NavWrapper';

const Wrapper = styled.section``;

function Campaign() {
  const { candidate, candidatePositions } = useContext(CandidateContext);
  const { endorsements } = candidate;

  let showSecondColumn = true;
  if (
    (!endorsements || endorsements.length === 0) &&
    (!candidatePositions || candidatePositions.length === 0)
  ) {
    showSecondColumn = false;
  }

  return (
    <Wrapper>
      <Grid container spacing={8} justify="center">
        <Grid item xs={12} lg={4}>
          <DateBox />
          <CampaignProgress />
          <DateBox showPast />
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          style={!showSecondColumn ? { display: 'none' } : {}}
        >
          <Endorsements />
          <MdUpOnly>
            <TopIssues />
          </MdUpOnly>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Campaign;
