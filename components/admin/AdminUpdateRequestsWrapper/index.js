/**
 *
 * AdminUpdateRequestsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { candidateRoute } from '/helpers/electionsHelper';

import RequestTopTab from '../AdminTopIssueRequestsWrapper/RequestTopTab';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { Body, H3 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import { dateUsHelper } from '/helpers/dateHelper';

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

const RequestWrapper = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: solid 1px #ccc;
`;

function AdminUpdateRequestsWrapper({
  ugc,
  acceptRequestCallback,
  rejectRequestCallback,
}) {
  return (
    <AdminPageWrapper>
      <Wrapper>
        <RequestTopTab />
        <Title>Update Requests from Candidates</Title>
        <br />
        <br />
        {ugc &&
          ugc.map(request => (
            <RequestWrapper key={request.id}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Body>
                    Candidate:{' '}
                    <a href={candidateRoute(request.candidate)} target="_blank" rel="noreferrer">
                      {request.candidate.firstName} {request.candidate.lastName}
                    </a>
                  </Body>
                </Grid>
                <Grid item xs={12} md={6} className="text-right">
                  <Body>{dateUsHelper(request.updatedAt)}</Body>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Body>
                    <strong>Field</strong>
                  </Body>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Body>
                    <strong>On Production</strong>
                  </Body>
                </Grid>
                <Grid item xs={12} md={4} style={{ marginBottom: '12px' }}>
                  <Body>
                    <strong>Updates Requested</strong>
                  </Body>
                </Grid>

                {Object.keys(request.data).map(field => (
                  <React.Fragment key={field}>
                    <Grid item xs={12} md={4}>
                      <strong>{field}</strong>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {request.candidate[field]?.charAt(0) === '<' ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: request.candidate[field],
                          }}
                        />
                      ) : (
                        request.candidate[field] || '(empty)'
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {request.data[field].charAt(0) === '<' ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: request.data[field],
                          }}
                        />
                      ) : (
                        request.data[field]
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
                <Grid item xs={12} md={8}>
                  &nbsp;
                </Grid>
                <Grid item xs={12} md={4}>
                  <br />
                  <PurpleButton
                    onClick={() => rejectRequestCallback(request.id)}
                    style={{ background: 'red', borderColor: 'red' }}
                  >
                    &nbsp;Deny Request&nbsp;
                  </PurpleButton>
                  &nbsp; &nbsp;
                  <PurpleButton
                    onClick={() => acceptRequestCallback(request.id)}
                  >
                    &nbsp;Accept Request&nbsp;
                  </PurpleButton>
                </Grid>
              </Grid>
            </RequestWrapper>
          ))}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminUpdateRequestsWrapper.propTypes = {
  ugc: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  acceptRequestCallback: PropTypes.func,
  rejectRequestCallback: PropTypes.func,
};

export default AdminUpdateRequestsWrapper;
