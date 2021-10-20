/**
 *
 * AdminUpdateRequestsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import { candidateRoute } from 'helpers/electionsHelper';

import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import { H3 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';

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

function AdminUpdateRequestsWrapper({ ugc }) {
  console.log('ugc', ugc);
  return (
    <AdminPageWrapper>
      <Wrapper>
        <Title>Update Requests from Candidates</Title>
        <br />
        <br />
        {ugc &&
          ugc.map(request => (
            <RequestWrapper key={request.id}>
              <h3 className="text-center">
                Candidate:{' '}
                <a href={candidateRoute(request.candidate)} target="_blank">
                  {request.candidate.firstName} {request.candidate.lastName}
                </a>
                <br />
                <CandidateAvatar
                  avatar={request.candidate.image}
                  party={request.candidate.party}
                  size="small"
                  partyBadge
                  centered
                />
              </h3>
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <H3>On Production</H3>
                </Grid>
                <Grid item xs={12} md={5}>
                  <H3>Updates Requested</H3>
                </Grid>
                <Grid item xs={12} md={2}>
                  <H3>Action</H3>
                </Grid>
                {Object.keys(request.data).map(field => (
                  <React.Fragment key={field}>
                    <Grid item xs={12} md={5}>
                      <strong>
                        {field}: {request.candidate[field]}
                      </strong>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <strong>{field}: </strong>
                      {request.data[field]}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Switch
                        // checked
                        // onChange={handleChange}
                        // name="checkedB"
                        color="primary"
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </RequestWrapper>
          ))}
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminUpdateRequestsWrapper.propTypes = {
  ugc: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default AdminUpdateRequestsWrapper;
