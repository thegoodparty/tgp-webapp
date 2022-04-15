/**
 *
 * CampaignApplicationsWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

import MaxWidth from '../../shared/MaxWidth';

import { Body11, Body14, H1, H3 } from '../../shared/typogrophy';
import PageWrapper from '../../shared/PageWrapper';
import { PurpleButton } from '../../shared/buttons';
import LoadingAnimation from '../../shared/LoadingAnimation';
import AlertDialog from '../../shared/AlertDialog';
import ApplicationPreview from './ApplicationPreview';

function CampaignApplicationsWrapper({
  createApplicationCallback,
  applications,
  loading,
  deleteApplicationCallback,
}) {
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
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '8px', minHeight: '80vh' }}>
        <br />
        <H1>Candidate registration and applications</H1>
        <div className="text-right">
          <PurpleButton onClick={createApplicationCallback}>
            <Body11 style={{ color: '#FFF' }}>
              &nbsp; <FaPlus size={12} />
              &nbsp; Create a new application &nbsp;
            </Body11>
          </PurpleButton>
          <br />
          &nbsp;
        </div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {(applications || []).length === 0 ? (
              <H3>
                <br />
                No Applications found
              </H3>
            ) : (
              <Grid container spacing={3}>
                {applications.map(app => (
                  <Grid item xs={12} md={6} lg={4} key={app.id}>
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
          </>
        )}
      </MaxWidth>
      <AlertDialog
        title="Delete Application?"
        description="This can't be undone, and you will have to deal with it in your afterlife"
        open={showDeleteAlert}
        handleClose={handleCloseAlert}
        handleProceed={handleProceedDelete}
      />
    </PageWrapper>
  );
}

CampaignApplicationsWrapper.propTypes = {
  createApplicationCallback: PropTypes.func,
  applications: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  deleteApplicationCallback: PropTypes.func,
};

export default CampaignApplicationsWrapper;
