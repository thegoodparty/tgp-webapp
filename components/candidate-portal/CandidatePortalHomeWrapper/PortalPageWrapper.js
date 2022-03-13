import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Nav from '/containers/shared/Nav';

import PortalLeftMenu from '../PortalLeftMenu';
import LoadingAnimation from '../../shared/LoadingAnimation';

const Wrapper = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: row;
  padding-top: 0;
`;

const MainPanel = styled.div`
  flex: 1;
`;

const PortalPageWrapper = ({ children, role, loading }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <Wrapper>
        <PortalLeftMenu id={id} role={role} />
        {loading ? <LoadingAnimation /> : <MainPanel>{children}</MainPanel>}
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
