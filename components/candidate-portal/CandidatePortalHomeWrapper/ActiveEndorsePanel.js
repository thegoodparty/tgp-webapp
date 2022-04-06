/**
 *
 * ActiveEndorsePanel
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaLongArrowAltUp } from 'react-icons/fa';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import PortalPanel from '../shared/PortalPanel';
import { Font16, FontH3 } from '../../shared/typogrophy';
import { progressPerc } from './CampaignPanel';
import CandidateButton from './CandidateButton';
import EndorseButtonModal from './EdorseButtonModal';
import EndorseChart from './EndorseChart';
import { numberFormatter } from '../../../helpers/numberHelper';

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
`;

const EditWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

function ActiveEndorsePanel() {
  const { stats, candidate } = useContext(CandidatePortalHomePageContext);
  const impressions = stats?.stats?.impressions;
  const clicks = stats?.stats?.clicks;

  const ctr = {
    total: 0,
    lastPeriod: 0,
  };

  if (impressions.total !== 0) {
    ctr.total = (clicks.total * 100) / impressions.total;
  }

  if (impressions.lastPeriod !== 0) {
    ctr.lastPeriod = (clicks.lastPeriod * 100) / impressions.lastPeriod;
  }

  const fields = [
    { label: 'IMPRESSIONS', data: impressions || {} },
    { label: 'CLICKS', data: clicks || {} },
    { label: 'CLICK-THRU RATE', data: ctr || {}, withPerc: true },
  ];

  return (
    <PortalPanel color="#CA2CCD">
      <Row>
        <FontH3 style={{ margin: 0 }}>Endorse Button</FontH3>
        {/*<RangeSelector />*/}
      </Row>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item xs={12} lg={4} key={field.label}>
                <Title>{field.label}</Title>
                <Stat>
                  {numberFormatter(field.data.total)}
                  {field.withPerc ? '%' : ''}
                </Stat>
                <Stat>
                  {progressPerc(field.data.total, field.data.lastPeriod)}
                </Stat>
              </Grid>
            ))}

            <Grid item xs={12}>
              &nbsp;
            </Grid>
            <Grid item xs={12} lg={6}>
              <CandidateButton candidate={candidate} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <EndorseButtonModal
                customElement={<EditWrapper>VIEW / EDIT</EditWrapper>}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} style={{ height: '100%' }}>
          <EndorseChart />
        </Grid>
      </Grid>
    </PortalPanel>
  );
}

export default ActiveEndorsePanel;
