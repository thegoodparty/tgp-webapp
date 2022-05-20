/**
 *
 * ApplicationSection
 *
 */

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { CampaignApplicationsPageContext } from '/containers/profile/CampaignApplicationsPage';

import { FontH3, H3 } from '../../shared/typogrophy';
import AlertDialog from '../../shared/AlertDialog';
import ApplicationPreview from './ApplicationPreview';
import PortalPanel from '../../candidate-portal/shared/PortalPanel';
import BlackOutlinedButton from '../../shared/buttons/BlackOutlinedButton';
import Row from '../../shared/Row';

function ApplicationSection() {
  const {
    createApplicationCallback,
    applications,
    loading,
    deleteApplicationCallback,
  } = useContext(CampaignApplicationsPageContext);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteApplicationId, setDeleteApplicationId] = useState(false);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowDeleteAlert(true);
    setDeleteApplicationId(id);
  };

  const handleCloseAlert = () => {
    setShowDeleteAlert(false);

    setDeleteApplicationId(false);
  };

  const handleProceedDelete = () => {
    if (deleteApplicationId !== false) {
      deleteApplicationCallback(deleteApplicationId);
    }
    handleCloseAlert();
  };
  return (
    <section>
      <PortalPanel color="#EE6C3B">
        <Row style={{ justifyContent: 'space-between' }}>
          <FontH3 style={{ margin: '0 0 70px' }} data-cy="applications-title">Applications</FontH3>
          <BlackOutlinedButton onClick={createApplicationCallback}>
            Start a new application
          </BlackOutlinedButton>
        </Row>

        {(applications || []).length === 0 ? (
          <H3 data-cy="no-applications">
            <br />
            No Applications found
          </H3>
        ) : (
          <Grid container spacing={3}>
            {applications.map((app) => (
              <Grid item xs={12} md={6} lg={4} key={app.id} data-cy="application-wrapper">
                <Link href={`/campaign-application/${app.id}/1`} passHref>
                  <a>
                    <ApplicationPreview
                      app={app}
                      deleteApplicationCallback={handleDelete}
                    />
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

        <AlertDialog
          title="Delete Application?"
          description="This can't be undone, and you will have to deal with it in your afterlife"
          open={showDeleteAlert}
          handleClose={handleCloseAlert}
          handleProceed={handleProceedDelete}
        />
      </PortalPanel>
    </section>
  );
}

ApplicationSection.propTypes = {
  createApplicationCallback: PropTypes.func,
  applications: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  deleteApplicationCallback: PropTypes.func,
};

export default ApplicationSection;
