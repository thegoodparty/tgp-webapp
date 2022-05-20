import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Nav from '/containers/shared/Nav';

import AdminLeftMenu from './AdminLeftMenu';
import LoadingAnimation from '../../shared/LoadingAnimation';
import MaxWidth from '/components/shared/MaxWidth';
import AdminPageTitle from './AdminPageTitle';
import Footer from '../../shared/Footer';

const Wrapper = styled.div`
  min-height: calc(100vh - 80px);

  margin: 0 auto;
  padding: 60px 24px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    flex-direction: row;
  }
`;

const MainPanel = styled.div`
  flex: 1;
  max-width: 100%;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    max-width: calc(100% - 220px);
  }
`;

const AdminPageWrapper = ({ children, loading, title }) => {
  return (
    <div style={{ backgroundColor: '#F4F4F4 ' }}>
      <Nav />
      <Wrapper>
        <AdminLeftMenu />
        {loading ? (
          <LoadingAnimation />
        ) : (
          <MainPanel>
            {title && <AdminPageTitle>{title}</AdminPageTitle>}
            {children}
          </MainPanel>
        )}
      </Wrapper>
      <Footer />
    </div>
  );
};

AdminPageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default AdminPageWrapper;
