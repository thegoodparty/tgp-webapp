/**
 *
 * AdminAddCandidateWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from 'containers/shared/Nav';
import MobileHeader from 'components/shared/navigation/MobileHeader';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

function AdminAddCandidateWrapper() {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <MobileHeader />
      <Wrapper>Admin add candidate</Wrapper>
    </div>
  );
}

AdminAddCandidateWrapper.propTypes = {};

export default AdminAddCandidateWrapper;
