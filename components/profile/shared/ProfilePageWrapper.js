import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Nav from '/containers/shared/Nav';

import ProfileLeftMenu from './ProfileLeftMenu';
import MaxWidth from '../../shared/MaxWidth';
import Footer from '../../shared/Footer';

const Wrapper = styled(MaxWidth)`
  min-height: calc(100vh - 80px);

  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 0;
  @media only screen and (min-width: 1024px) {
    display: flex;
    flex-direction: row;
  }
`;

const MainPanel = styled.div`
  flex: 1;
  max-width: 100%;
  @media only screen and (min-width: 1024px) {
    max-width: calc(100% - 220px);
  }
`;

const ProfilePageWrapper = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#F4F4F4 ' }}>
      <Nav />
      <Wrapper>
        <ProfileLeftMenu />
        <MainPanel>{children}</MainPanel>
      </Wrapper>
      <Footer />
    </div>
  );
};

ProfilePageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ProfilePageWrapper;
