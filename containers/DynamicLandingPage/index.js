/**
 *
 * DynamicLandingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDynamicLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import DynamicLandingPageWrapper from '../../components/DynamicLandingPageWrapper';
import { makeSelectContent } from '../App/selectors';
import TgpHelmet from '../../components/shared/TgpHelmet';

export function DynamicLandingPage({ ssrState }) {
  useInjectReducer({ key: 'dynamicLandingPage', reducer });
  useInjectSaga({ key: 'dynamicLandingPage', saga });

  const router = useRouter();
  const { slug } = router.query;
  console.log('slug', slug);
  const pageContent = ssrState.content?.landingPages
    ? ssrState.content.landingPages[slug]
    : false;
  if (!pageContent) {
    return <ErrorPage statusCode={404} />;
  }

  const childProps = {
    pageContent,
  };

  return (
    <div>
      <TgpHelmet
        title={pageContent.metaTitle}
        description={pageContent.metaDescription}
      />

      <DynamicLandingPageWrapper {...childProps} />
    </div>
  );
}

DynamicLandingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dynamicLandingPage: makeSelectDynamicLandingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DynamicLandingPage);
