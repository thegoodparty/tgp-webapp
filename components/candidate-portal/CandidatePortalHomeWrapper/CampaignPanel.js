/**
 *
 * CampaignPanel
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

import PortalPanel from '../shared/PortalPanel';
import { Font16, FontH3 } from '../../shared/typogrophy';
import RangeSelector from '../shared/RangeSelector';
import ChartBlur from './ChartBlur';
import PinkButton from '../../shared/buttons/PinkButton';
import { InnerButton } from '../../shared/buttons/BlackButton';
import Tooltip from '../../shared/Tooltip';
import CampaignChart from './CampaignChart';

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

const Relative = styled.div`
  position: relative;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Started = styled.div`
  font-size: 22px;
  margin-bottom: 32px;

  strong {
    font-weight: 900;
    color: #ca2ccd;
  }
`;

const Whats = styled.div`
  font-weight: 700;
  margin-top: 32px;
  color: #7a7a7a;
  cursor: pointer;
`;

function CampaignPanel() {
  return (
    <PortalPanel color="#2CCDB0">
      <Row>
        <FontH3 style={{ margin: 0 }}>Campaign Page</FontH3>
        <RangeSelector />
      </Row>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Title>VIEWS</Title>
              <Stat>1,000,000</Stat>
              <Stat>
                <Icon>
                  <FaLongArrowAltUp />
                </Icon>
                0%
              </Stat>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Title>SHARES</Title>
              <Stat>1,000,000</Stat>
              <Stat>
                <Icon>
                  <FaLongArrowAltUp />
                </Icon>
                0%
              </Stat>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Title>ENDORSEMENTS</Title>
              <Stat>1,000,000</Stat>
              <Stat>
                <Icon className="down">
                  <FaLongArrowAltDown />
                </Icon>
                0%
              </Stat>
              <Stat style={{ marginRight: 0 }}>(avg. 0%)</Stat>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} style={{ height: '100%' }}>
          <CampaignChart />
        </Grid>
      </Grid>
    </PortalPanel>
  );
}

export default CampaignPanel;
