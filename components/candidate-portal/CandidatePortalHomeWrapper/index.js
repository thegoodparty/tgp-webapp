/**
 *
 * CandidatePortalHomeWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import CandidatePortalUpdatesContainer from '/containers/candidate-portal/CandidatePortalUpdatesPage/CandidatePortalUpdatesContainer';

import PortalPageWrapper from './PortalPageWrapper';
import { H2, H3 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import CampaignStats from './CampaignStats';

const Wrapper = styled.div`
  text-align: center;
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const UpdatesWrapper = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.gray7};
  border-radius: 8px;
  padding: 16px;
  margin-top: 48px;
`;

function CandidatePortalHomeWrapper({
  candidate,
  stats,
  loadStatsCallback,
  role,
}) {
  return (
    <PortalPageWrapper role={role}>
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
            <div className="text-left">
              <CampaignStats
                stats={stats}
                loadStatsCallback={loadStatsCallback}
                id={candidate.id}
              />
              <UpdatesWrapper>
                <H3>Campaign Updates</H3>
                <CandidatePortalUpdatesContainer
                  candidate={candidate}
                  pageLevel={false}
                />
              </UpdatesWrapper>
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
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default CandidatePortalHomeWrapper;
