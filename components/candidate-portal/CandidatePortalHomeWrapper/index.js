/**
 *
 * CandidatePortalHomeWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

import PortalPageWrapper from './PortalPageWrapper';
import { Body13, H2, H3, Body } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { partyResolver } from '../../../helpers/electionsHelper';
import { leftMenuItems } from '../PortalLeftMenu';
import CampaignStats from './CampaignStats';

const Wrapper = styled.div`
  text-align: center;
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function CandidatePortalHomeWrapper({ candidate, stats, loadStatsCallback, }) {
  return (
    <PortalPageWrapper>
      <Wrapper>
        <div>
          <CandidateAvatar
            avatar={candidate.image}
            party={candidate.party}
            size="medium"
            partyBadge
          />
          <H2 style={{ marginBottom: '48px' }}>
            Welcome to Good Party Candidate Portal
          </H2>
          {candidate && (
            <div>
              <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12} md={6}>
                  Tip of the day
                </Grid>
                <Grid item xs={12} md={6}>
                  <CampaignStats stats={stats} loadStatsCallback={loadStatsCallback} />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Wrapper>
    </PortalPageWrapper>
  );
}

CandidatePortalHomeWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  stats: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  loadStatsCallback: PropTypes.func,
};

export default CandidatePortalHomeWrapper;
