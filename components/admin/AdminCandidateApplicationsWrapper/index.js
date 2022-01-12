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
import { H3 } from '../../shared/typogrophy';

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
function AdminCandidateApplicationsWrapper({}) {
  return (
    <AdminPageWrapper>
      <Wrapper>
        <RequestTopTab activeTab="Candidate Applications" />
        <Title>Candidate Applications in review</Title>
        <br />
        <br />
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminCandidateApplicationsWrapper.propTypes = {};

export default AdminCandidateApplicationsWrapper;
