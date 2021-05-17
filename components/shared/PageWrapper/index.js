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
  &.purple {
    background-color: ${({ theme }) => theme.colors.purple3};
  }
`;
const TopBannerWrapper = styled.div`
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    margin-top: 18px;
  }
`;

const HomeWrapper = styled.div`
  width: 100%;
  padding: 0 32px 0;
  @media only screen and (min-width: ${({ theme }) =>
    theme.breakpointsPixels.contentMax}) {
    padding: 0;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpointsPixels.lg}) {
    padding-right: 24px;
    padding-left: 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpointsPixels.sm}) {
    padding-right: 18px;
    padding-left: 18px;
  }
`;
function PageWrapper({
  children,
  hideNav,
  white,
  purple,
  wrapperStyles = {},
  hideMobileNav,
  style = {},
  topBanner,
  isFullWidth = false,
}) {
  const WrapperComp = isFullWidth ? HomeWrapper : Wrapper;
  let className = '';
  if (white) {
    className = 'white';
  } else if (purple) {
    className = 'purple';
  }
  return (
    <MainWrapper className={className} style={style}>
      {!hideNav && <Nav hideMobileNav={hideMobileNav} />}
      {topBanner && <TopBannerWrapper>{topBanner}</TopBannerWrapper>}
      <WrapperComp
        white={white}
        purple={purple}
        style={wrapperStyles}
        noHeader={hideNav}
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
  hideMobileNav: PropTypes.bool,
  isFullWidth: PropTypes.bool,
};

export default PageWrapper;
