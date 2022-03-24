import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Nav from '/containers/shared/Nav';

import PortalLeftMenu from './PortalLeftMenu';
import LoadingAnimation from '../../shared/LoadingAnimation';
import { MaxContent } from '../../TeamWrapper';
import PortalPageTitle from './PortalPageTitle';

const Wrapper = styled(MaxContent)`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: row;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding-top: 60px;
`;

const MainPanel = styled.div`
  flex: 1;
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
            {title && <PortalPageTitle>{title}</PortalPageTitle>}
            {children}
          </MainPanel>
        )}
      </Wrapper>
    </div>
  );
};

PortalPageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default PortalPageWrapper;
