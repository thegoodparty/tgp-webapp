/**
 *
 * ProfileWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageWrapper from 'components/shared/PageWrapper';

const TopSection = styled.section`
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.purple4};
`;

const MaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;
function ProfileWrapper() {
  return (
    <PageWrapper purple isFullWidth>
      <TopSection>
        <MaxWidth>Tomer</MaxWidth>
      </TopSection>
    </PageWrapper>
  );
}

ProfileWrapper.propTypes = {};

export default ProfileWrapper;
