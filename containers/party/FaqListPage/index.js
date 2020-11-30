/**
 *
 * FaqListPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useRouter } from 'next/router'

import { makeSelectContent } from 'containers/App/selectors';

import FaqListWrapper from 'components/party/FaqListWrapper';

export function FaqListPage({ content }) {
  const router = useRouter();
  const childProps = {
    content,
    backButtonCallback: () => router.back(),
  };
  return (
    <div>
      <Head>
        <title data-cy="page-title">FAQs | The Good Party</title>
        <meta name="description" content="Frequently Asked Questions" />
      </Head>
      <FaqListWrapper {...childProps} />
    </div>
  );
}

FaqListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backButtonCallback: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FaqListPage);
