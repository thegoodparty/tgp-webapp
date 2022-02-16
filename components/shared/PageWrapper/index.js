/**
 *
 * PageWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Nav from '/containers/shared/Nav';
import Wrapper from '/components/shared/Wrapper';
import Footer from '/components/shared/Footer';

const MainWrapper = styled.div`
  &.purple {
    background-color: ${({ theme }) => theme.colors.purpleBg};
  }
`;
const TopBannerWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 18px;
  }
`;

const HomeWrapper = styled.div`
  width: 100%;
  padding: 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.contentMax}) {
    padding: 0;
  }

  &.no-padding {
    padding: 0;
  }
`;
function PageWrapper({
  children,
  hideNav,
  purple,
  wrapperStyles = {},
  style = {},
  topBanner,
  isFullWidth = false,
  purpleNav = false,
  noPadding = false,
}) {
  const WrapperComp = isFullWidth ? HomeWrapper : Wrapper;
  let className = '';
  if (purple) {
    className = 'purple';
  }
  return (
    <MainWrapper className={className} style={style}>
      {!hideNav && <Nav purpleNav={purpleNav} />}
      {topBanner && <TopBannerWrapper>{topBanner}</TopBannerWrapper>}
      <WrapperComp
        purple={purple}
        white
        style={wrapperStyles}
        noHeader={hideNav}
        className={`${purpleNav && 'purple-nav'} ${noPadding && 'no-padding '}`}
      >
        {/* {!hideNav && <MobileHeader {...mobileHeaderProps} />} */}
        {children}
      </WrapperComp>
      <Footer />
    </MainWrapper>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  hideNav: PropTypes.bool,
  white: PropTypes.bool,
  wrapperStyles: PropTypes.object,
  purple: PropTypes.bool,
  topBanner: PropTypes.object,
  style: PropTypes.object,
  isFullWidth: PropTypes.bool,
  purpleNav: PropTypes.bool,
};

export default PageWrapper;
