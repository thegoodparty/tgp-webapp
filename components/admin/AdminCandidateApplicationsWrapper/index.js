/**
 *
 * AdminCandidateApplicationsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import RequestTopTab from '../AdminTopIssueRequestsWrapper/RequestTopTab';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { H3, Body13 } from '../../shared/typogrophy';
import ApplicationPreview from '../../profile/CampaignApplicationsWrapper/ApplicationPreview';

const Wrapper = styled.div`
  padding: 16px;
  overflow-x: auto;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Title = styled(H3)`
  margin-bottom: 12px;
  text-align: center;
`;
function AdminCandidateApplicationsWrapper({ applications }) {
  return (
    <AdminPageWrapper>
      <Wrapper>
        <RequestTopTab activeTab="Candidate Applications" />
        <Title>Candidate Applications in review</Title>
        <br />
        <br />
        {(applications || []).length === 0 ? (
          <H3>
            <br />
            No Applications found
          </H3>
        ) : (
          <Grid container spacing={3}>
            {applications.map(app => (
              <Grid item xs={12} md={6} lg={4} kep={app.id}>
                <ApplicationPreview app={app} />
                <br />
                <Body13 className="text-center">
                  Created By: <br />
                  {app.user?.email}<br />
                  {app.user?.name}
                </Body13>
              </Grid>
            ))}
          </Grid>
        )}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminCandidateApplicationsWrapper.propTypes = {
  applications: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminCandidateApplicationsWrapper;
