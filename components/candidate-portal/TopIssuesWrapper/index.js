/**
 *
 * TopIssuesWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { TopIssuesPageContext } from '/containers/candidate-portal/TopIssuesPage';
import { FontH2, Font16, FontH3 } from '../../shared/typogrophy';
import PortalPageWrapper from '../shared/PortalPageWrapper';

import TopIssue from './TopIssue';
import EditableTopIssue from './EditableTopIssue';
import PortalPanel from '../shared/PortalPanel';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function TopIssuesWrapper() {
  const { candidatePositions, candidate, role } =
    useContext(TopIssuesPageContext);
  return (
    <PortalPageWrapper role={role} title="Edit Campaign Issues">
      <PortalPanel color="#14C285">
        <FontH3 style={{ margin: '0 0 45px 0' }}>Issues</FontH3>
        <Grid container spacing={3} alignItems="center">
          {candidatePositions.map((candidatePosition, index) => (
            <TopIssue index={index} candidatePosition={candidatePosition} />
          ))}
          <EditableTopIssue />
        </Grid>
      </PortalPanel>
    </PortalPageWrapper>
  );
}

export default TopIssuesWrapper;
