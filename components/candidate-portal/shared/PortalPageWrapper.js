import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Nav from '/containers/shared/Nav';

import PortalLeftMenu from './PortalLeftMenu';
import LoadingAnimation from '../../shared/LoadingAnimation';
import MaxWidth from '../../shared/MaxWidth';
import PortalPageTitle from './PortalPageTitle';
import Footer from '../../shared/Footer';

const Wrapper = styled(MaxWidth)`
  min-height: calc(100vh - 80px);

  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 60px 0;
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

const PortalPageWrapper = ({ children, role, loading, title }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div style={{ backgroundColor: '#F4F4F4 ' }}>
      <Nav />
      <Wrapper>
        <PortalLeftMenu id={id} role={role} />
        {loading ? (
          <LoadingAnimation />
        ) : (
          <MainPanel>
            {title && <PortalPageTitle data-cy="pate-title">{title}</PortalPageTitle>}
            {children}
          </MainPanel>
        )}
      </Wrapper>
      <Footer />
    </div>
  );
};

PortalPageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default PortalPageWrapper;
