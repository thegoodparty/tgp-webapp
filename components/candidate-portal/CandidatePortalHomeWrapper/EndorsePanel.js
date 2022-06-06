/**
 *
 * EndorsePanel
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaLongArrowAltUp } from 'react-icons/fa';

import { CandidatePortalHomePageContext } from '/containers/candidate-portal/CandidatePortalHomePage';

import PortalPanel from '../shared/PortalPanel';
import { Font16, FontH3 } from '../../shared/typogrophy';
import RangeSelector from '../shared/RangeSelector';
import ChartBlur from './ChartBlur';
import Tooltip from '../../shared/Tooltip';
import EndorseButtonModal from './EdorseButtonModal';

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

function EndorsePanel() {
  return (
    <PortalPanel color="#CA2CCD">
      <Row>
        <FontH3 style={{ margin: 0 }}>Endorse Button</FontH3>
        {/*<RangeSelector />*/}
      </Row>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <Title>IMPRESSIONS</Title>
              <Stat>0</Stat>
              <Stat>
                <Icon>
                  <FaLongArrowAltUp />
                </Icon>
                0%
              </Stat>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Title>CLICKS</Title>
              <Stat>0</Stat>
              <Stat>
                <Icon>
                  <FaLongArrowAltUp />
                </Icon>
                0%
              </Stat>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Title>CLICK-THRU RATE</Title>
              <Stat>0</Stat>
              <Stat>
                <Icon>
                  <FaLongArrowAltUp />
                </Icon>
                0%
              </Stat>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={5} style={{ height: '100%' }}>
          <Relative>
            <ChartBlur />
            <Overlay>
              <div>
                <Started>
                  To <strong>get started</strong>, please customize and embed
                  your endorse button.
                </Started>
                <EndorseButtonModal />
                <div>
                  <Tooltip triggerEl={<Whats>What’s this?</Whats>}>
                    <strong>What’s the endorse button?</strong>
                    <br />
                    <br />A way for you to promote your campaign across other
                    platforms, grow your supporter base in one place and prove
                    your campaign is viable.
                  </Tooltip>
                </div>
              </div>
            </Overlay>
          </Relative>
        </Grid>
      </Grid>
    </PortalPanel>
  );
}

export default EndorsePanel;
