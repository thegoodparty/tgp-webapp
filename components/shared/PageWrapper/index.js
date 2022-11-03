/**
 *
 * PageWrapper
 *
 */

import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styles from './PageWrapper.module.scss';

import Nav from '/containers/shared/Nav';
import Footer from '/components/shared/Footer';

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
      {!hideFooter && <Footer />}
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
