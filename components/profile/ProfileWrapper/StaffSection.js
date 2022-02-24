/**
 *
 * StaffSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { Body19 } from '/components/shared/typogrophy';
import { GrayText } from './index';
import StaffCard from './StaffCard';

const Wrapper = styled.section`
  margin-top: 36px;
  margin-bottom: 36px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 64px;
  }
`;
function StaffSection({ staff }) {
  if (!staff || staff.length === 0) {
    return <></>;
  }
  return (
    <Wrapper>
      <Body19>
        <strong>You are a staff member for the following campaigns</strong>
        <br />
        <GrayText>
          Click on a campaign to access the campaign management portal
        </GrayText>
        <Grid container spacing={1} style={{ marginTop: '24px' }}>
          {staff.map((staffItem) => (
            <Grid item xs={12} sm={6} lg={4} key={staffItem.id}>
              <StaffCard staff={staffItem} />
            </Grid>
          ))}
        </Grid>
      </Body19>
    </Wrapper>
  );
}

StaffSection.propTypes = {
  staff: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default StaffSection;
