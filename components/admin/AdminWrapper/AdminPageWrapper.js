import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Nav from 'containers/shared/Nav';

import AdminLeftMenu from '../AdminLeftMenu';

const Wrapper = styled.div`
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
  padding-top: 0;
`;

const MainPanel = styled.div`
  flex: 1;
`;

const AdminPageWrapper = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <Wrapper>
        <AdminLeftMenu />

        <MainPanel>{children}</MainPanel>
      </Wrapper>
    </div>
  );
};

AdminPageWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default AdminPageWrapper;
