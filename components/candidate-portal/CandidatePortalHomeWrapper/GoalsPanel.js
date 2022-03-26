/**
 *
 * GoalsPanel
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

import PortalPanel from '../shared/PortalPanel';
import { Font16, FontH3 } from '../../shared/typogrophy';
import RangeSelector from '../shared/RangeSelector';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import CampaignChart from './CampaignChart';
import GoalsChart from './GoalsChart';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 45px;
`;

const Title = styled(Font16)`
  font-weight: 700;
  margin-bottom: 10px;
`;

const Stat = styled(Font16)`
  display: inline-block;
  margin-right: 12px;
  color: #636363;
`;

const Icon = styled.div`
  display: inline-block;
  color: #2cc987;
  margin-right: 2px;

  &.down {
    color: #bf0020;
  }
`;

function GoalsPanel() {
  return (
    <PortalPanel color="#422CCD">
      <FontH3 style={{ margin: '0 0 45px 0' }}>Campaign Goals</FontH3>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Title>VOTES NEEDED TO WIN 🎉</Title>
              <Stat>7,432,234</Stat>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Title>LIKELY VOTES SO FAR 🗳</Title>
              <Stat>4,665,297</Stat>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <BlackButton style={{ marginTop: '40px' }}>
              <InnerButton>Add Campaign Update</InnerButton>
            </BlackButton>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} style={{ height: '100%' }}>
          <GoalsChart />
        </Grid>
      </Grid>
    </PortalPanel>
  );
}

export default GoalsPanel;
