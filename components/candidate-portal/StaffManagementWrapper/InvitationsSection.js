/**
 *
 * InvitationsSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { H2 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  text-align: left;
  padding: 24px;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 48px auto 0;
  border-top: solid 1px #ccc;
`;


function InvitationsSection({ staffInvitations }) {
  if (!staffInvitations || staffInvitations.length === 0) {
    return <></>;
  }
  return (
    <Wrapper>
      <H2>Pending Invitations</H2>
      <br />
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <strong>Email</strong>
        </Grid>
        <Grid item xs={6}>
          <strong>Role</strong>
        </Grid>
        {staffInvitations &&
          staffInvitations.map((invitation) => (
            <React.Fragment key={invitation.id}>
              <Grid item xs={6}>
                {invitation.email}
              </Grid>
              <Grid item xs={6}>
                {invitation.role}
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </Wrapper>
  );
}

InvitationsSection.propTypes = {
  staffInvitations: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default InvitationsSection;
