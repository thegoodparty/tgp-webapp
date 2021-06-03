/**
 *
 * AdminCampaignSettingsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { H3 } from 'components/shared/typogrophy';
import Nav from 'containers/shared/Nav';
import Campaign from './Campaign';

const Wrapper = styled.div`
  padding: 16px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Title = styled(H3)`
  margin-bottom: 36px;
  text-align: center;
  position: relative;
`;

function AdminCampaignSettingsWrapper({ candidates }) {
  if (!candidates) {
    return <></>;
  }
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <Wrapper>
        <Title>Campaign Settings</Title>

        <Grid container spacing={3}>
          {candidates.map(candidate => (
            <Grid item xs={12} md={6} key={candidate.id}>
              <Campaign candidate={candidate} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
}

AdminCampaignSettingsWrapper.propTypes = {
  candidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminCampaignSettingsWrapper;
