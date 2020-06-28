/**
 *
 * PageWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from 'containers/shared/Nav';
import Wrapper from 'components/shared/Wrapper';
import Footer from 'components/shared/Footer';
import MobileHeader from 'components/shared/navigation/MobileHeader';

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.grayBg};
  &.white {
    background-color: #fff;
  }
`;
function PageWrapper({
  children,
  hideNav,
  white,
  mobileHeaderProps = {},
  wrapperStyles = {},
  hideMobileNav,
  style = {},
}) {
  console.log('in page wrapper', mobileHeaderProps);
  return (
    <MainWrapper className={white ? 'white' : ''} style={style}>
      {!hideNav && <Nav hideMobileNav={hideMobileNav} />}
      <Wrapper white={white} style={wrapperStyles} noHeader={hideNav}>
        {!hideNav && <MobileHeader {...mobileHeaderProps} />}
        {children}
      </Wrapper>
      <Footer />
    </MainWrapper>
  );
}

PageWrapper.propTypes = {
  hideNav: PropTypes.bool,
  white: PropTypes.bool,
  wrapperStyles: PropTypes.object,
  mobileHeaderProps: PropTypes.object,
  style: PropTypes.object,
  hideMobileNav: PropTypes.bool,
};

export default PageWrapper;
