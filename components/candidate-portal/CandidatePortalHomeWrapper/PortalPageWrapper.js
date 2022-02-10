import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Nav from '/containers/shared/Nav';

import PortalLeftMenu from '../PortalLeftMenu';

const Wrapper = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
  padding-top: 0;
`;

const MainPanel = styled.div`
  flex: 1;
`;

const PortalPageWrapper = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <Wrapper>
        <PortalLeftMenu />

        <MainPanel>{children}</MainPanel>
      </Wrapper>
    </div>
  );
};

PortalPageWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PortalPageWrapper;
