/**
 *
 * ProfileSettingsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import PageWrapper from '../../shared/PageWrapper';
import TopSection from './TopSection';
import PersonalSection from './PersonalSection';

function ProfileSettingsWrapper({ user, signoutCallback, updateUserCallback }) {
  return (
    <PageWrapper purple>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={7}>
          <TopSection signoutCallback={signoutCallback} />
          <PersonalSection
            user={user}
            updateUserCallback={updateUserCallback}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          Image
        </Grid>
      </Grid>
    </PageWrapper>
  );
}

ProfileSettingsWrapper.propTypes = {
  user: PropTypes.object,
  signoutCallback: PropTypes.func,
  updateUserCallback: PropTypes.func,
};

export default ProfileSettingsWrapper;
