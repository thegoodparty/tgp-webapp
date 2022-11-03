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

function ProfileSettingsWrapper({ isTest = false }) {
  const Content = () => (
    <>
      <ImageSection />
      <PersonalSection />
      <PasswordSection />
      <DeleteSection />
    </>
  );
  if(isTest) {
    return (<Content />);
  }
  return (
    <ProfilePageWrapper>
      <Content />
    </ProfilePageWrapper>
  );
}

export default ProfileSettingsWrapper;
