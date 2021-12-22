/**
 *
 * CampaignApplicationsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';

import { dateUsHelper } from 'helpers/dateHelper';

import MaxWidth from '../ProfileWrapper/MaxWidth';
import ProfileTabs from '../ProfileWrapper/ProfileTabs';
import { Body, Body13, H1, H3 } from '../../shared/typogrophy';
import PageWrapper from '../../shared/PageWrapper';
import { PurpleButton } from '../../shared/buttons';
import LoadingAnimation from '../../shared/LoadingAnimation';

const ApplicationWrapper = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.colors.purpleBg};
  border-radius: 8px;
  cursor: pointer;
`;

function candidateName(app) {
  let name = 'n/a';
  let { data } = app;
  if (data && typeof data === 'string') {
    data = JSON.parse(data);
  }
  if (data.candidate) {
    name = `${data.candidate.firstName} ${data.candidate.lastName}`;
  }
  return name;
}

function CampaignApplicationsWrapper({
  createApplicationCallback,
  applications,
  loading,
}) {
  return (
    <PageWrapper isFullWidth>
      <MaxWidth style={{ padding: '8px', minHeight: '80vh' }}>
        <br />
        <ProfileTabs activeTab="Application" />
        <H1>Candidate registration and applications</H1>
        <div className="text-right">
          <PurpleButton onClick={createApplicationCallback}>
            &nbsp; <FaPlus size={24} />
            &nbsp; Create a new application &nbsp;
          </PurpleButton>
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
                  <Grid item xs={12} md={6} lg={4}>
                    <Link href={`/campaign-application/${app.id}/1`} passHref>
                      <a>
                        <ApplicationWrapper>
                          <Body>
                            <strong>Candidate: {candidateName(app)}</strong>
                          </Body>
                          <br />
                          <br />
                          <br />
                          <Body>
                            <strong>Status: {app.status}</strong>
                          </Body>
                          <br />
                          <Body13>
                            Created At: {dateUsHelper(app.createdAt)}
                            <br />
                            Last Update: {dateUsHelper(app.updatedAt)}
                          </Body13>
                        </ApplicationWrapper>
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </MaxWidth>
    </PageWrapper>
  );
}

CampaignApplicationsWrapper.propTypes = {
  createApplicationCallback: PropTypes.func,
  applications: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default CampaignApplicationsWrapper;
