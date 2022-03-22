/**
 *
 * TopIssuesWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { TopIssuesPageContext } from '/containers/candidate-portal/TopIssuesPage';
import { FontH2, Font16 } from '../../shared/typogrophy';
import PortalPageWrapper from '../CandidatePortalHomeWrapper/PortalPageWrapper';

import TopIssue from './TopIssue';
import EditableTopIssue from './EditableTopIssue';

const Wrapper = styled.div`
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

function TopIssuesWrapper() {
  const { candidatePositions, candidate, role } =
    useContext(TopIssuesPageContext);
  return (
    <PortalPageWrapper role={role}>
      <Wrapper>
        <FontH2 className="text-left">
          Issues
          {candidate ? ` - ${candidate.firstName} ${candidate.lastName}` : ''}
        </FontH2>
        <Font16 className="text-left">
          Select up to 10 top issues for your campaign in order of importance.
        </Font16>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <hr />
          </Grid>

          {candidatePositions.map((candidatePosition, index) => (
            <TopIssue index={index} candidatePosition={candidatePosition} />
          ))}
          <EditableTopIssue />
        </Grid>
      </Wrapper>
    </PortalPageWrapper>
  );
}

export default TopIssuesWrapper;
