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
import DeleteAccount from './DeleteAccount';
import ProfileTabs from '../ProfileWrapper/ProfileTabs';

function ProfileSettingsWrapper({
  user,
  signoutCallback,
  updateUserCallback,
  changePasswordCallback,
  uploadImageCallback,
  deleteAccountCallback,
}) {
  return (
    <PageWrapper isFullWidth>
      <IncompleteProfileBanner user={user} />
      <MaxWidth style={{ padding: '8px' }}>
        <ProfileTabs activeTab="Settings" />
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
            <DeleteAccount deleteAccountCallback={deleteAccountCallback} />
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
  deleteAccountCallback: PropTypes.func,
};

export default ProfileSettingsWrapper;
