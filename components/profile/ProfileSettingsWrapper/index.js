/**
 *
 * ProfileSettingsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageWrapper from '../../shared/PageWrapper';
import TopSection from './TopSection';

function ProfileSettingsWrapper({ user }) {
  return (
    <PageWrapper purple isFullWidth>
      <TopSection user={user} />
    </PageWrapper>
  );
}

ProfileSettingsWrapper.propTypes = {
  user: PropTypes.object,
};

export default ProfileSettingsWrapper;
