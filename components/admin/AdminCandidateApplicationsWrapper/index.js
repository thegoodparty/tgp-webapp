/**
 *
 * AdminCandidateApplicationsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import AdminPageWrapper from '../shared/AdminPageWrapper';
import { H3, Body13 } from '../../shared/typogrophy';
import ApplicationPreview from '../../profile/CampaignApplicationsWrapper/ApplicationPreview';
import AdminPanel from '../shared/AdminPanel';

function AdminCandidateApplicationsWrapper({ applications }) {
  return (
    <AdminPageWrapper title="Candidate Applications in review">
      <AdminPanel>
        {(applications || []).length === 0 ? (
          <H3>No Applications found</H3>
        ) : (
          <Grid container spacing={3}>
            {applications.map((app) => (
              <Grid item xs={12} md={6} lg={4} key={app.id}>
                <ApplicationPreview app={app} />
                <br />
                <Body13 className="text-center">
                  Created By: <br />
                  {app.user?.email}
                  <br />
                  {app.user?.name}
                </Body13>
              </Grid>
            ))}
          </Grid>
        )}
      </AdminPanel>
    </AdminPageWrapper>
  );
}

AdminCandidateApplicationsWrapper.propTypes = {
  applications: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminCandidateApplicationsWrapper;
