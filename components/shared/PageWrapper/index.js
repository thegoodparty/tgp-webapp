/**
 *
 * PageWrapper
 *
 */

import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from './PageWrapper.module.scss';
import dynamic from 'next/dynamic';

import Nav from '/containers/shared/Nav';
import Wrapper from '/components/shared/Wrapper';
import Footer from '/components/shared/Footer';

// const Footer = dynamic(() => import('/components/shared/Footer'), {
//   suspense: true,
// });

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
  style = {},
  topBanner,
  isFullWidth = false,
  hideFooter = false,
  hideNav = false,
}) {
  return (
    <div style={style}>
      {!hideNav && <Nav />}
      {topBanner && <div className={styles.topBanner}>{topBanner}</div>}
      <div className={isFullWidth ? styles.fullWidth : styles.wrapper}>
        {children}
      </div>
      {!hideFooter && (
        // <Suspense fallback={`Loading...`}>
        <Footer />
        // </Suspense>
      )}
    </div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node,
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
