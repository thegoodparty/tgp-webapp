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
const TopBannerWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 18px;
  }
`;

const HomeWrapper=styled.div`
  width: 100%;
`;
function PageWrapper({
  children,
  hideNav,
  white,
  mobileHeaderProps = {},
  wrapperStyles = {},
  hideMobileNav,
  style = {},
  topBanner,
  isHome = false
}) {
  const WrapperComp = isHome ? HomeWrapper : Wrapper;
  return (
    <MainWrapper className={white ? 'white' : ''} style={style}>
      {!hideNav && <Nav hideMobileNav={hideMobileNav} />}
      {topBanner && <TopBannerWrapper>{topBanner}</TopBannerWrapper>}
      <WrapperComp white={white} style={wrapperStyles} noHeader={hideNav}>
        {!hideNav && <MobileHeader {...mobileHeaderProps} />}
        {children}
      </WrapperComp>
      <Footer />
    </MainWrapper>
  );
}

PageWrapper.propTypes = {
  hideNav: PropTypes.bool,
  white: PropTypes.bool,
  wrapperStyles: PropTypes.object,
  mobileHeaderProps: PropTypes.object,
  topBanner: PropTypes.object,
  style: PropTypes.object,
  hideMobileNav: PropTypes.bool,
};

export default PageWrapper;
