/**
 *
 * ProfileSettingsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import PageWrapper from '../../shared/PageWrapper';
import TopSection from './TopSection';
import PersonalSection from './PersonalSection';
import ImageSection from './ImageSection';
import IncompleteProfileBanner from './IncompleteProfileBanner';
import MaxWidth from '../ProfileWrapper/MaxWidth';

function ProfileSettingsWrapper({
  user,
  signoutCallback,
  updateUserCallback,
  changePasswordCallback,
  uploadImageCallback,
}) {
  return (
    <PageWrapper isFullWidth>
      <IncompleteProfileBanner user={user} />
      <MaxWidth style={{ padding: '12px' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <TopSection
              signoutCallback={signoutCallback}
              user={user}
              uploadImageCallback={uploadImageCallback}
            />
            <PersonalSection
              user={user}
              updateUserCallback={updateUserCallback}
              changePasswordCallback={changePasswordCallback}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <ImageSection
              user={user}
              uploadImageCallback={uploadImageCallback}
            />
          </Grid>
        </Grid>
      </MaxWidth>
    </PageWrapper>
  );
}

ProfileSettingsWrapper.propTypes = {
  user: PropTypes.object,
  signoutCallback: PropTypes.func,
  updateUserCallback: PropTypes.func,
  changePasswordCallback: PropTypes.func,
  uploadImageCallback: PropTypes.func,
};

export default ProfileSettingsWrapper;
