/**
 *
 * ProfileSettingsWrapper
 *
 */

import React from 'react';

import ProfilePageWrapper from '../shared/ProfilePageWrapper';
import ImageSection from './ImageSection';
import PersonalSection from './PersonalSection';
import PasswordSection from './PasswordSection';
import DeleteSection from './DeleteSection';

function ProfileSettingsWrapper() {
  return (
    <ProfilePageWrapper>
      <ImageSection />
      <PersonalSection />
      <PasswordSection />
      <DeleteSection />
    </ProfilePageWrapper>
  );
}

export default ProfileSettingsWrapper;
