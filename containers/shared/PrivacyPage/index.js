/**
 *
 * PrivacyPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import PrivacyWrapper from 'components/shared/PrivacyWrapper';
import { makeSelectContent } from 'containers/App/selectors';

export function PrivacyPage({ content }) {
  const childProps = {
    content,
  };
  return (
    <div>
      <Head>
        <title data-cy="page-title">Privacy Policy | The Good Party</title>
        <meta name="description" content="Privacy Policy | The Good Party" />
      </Head>
      <PrivacyWrapper {...childProps} />
    </div>
  );
}

PrivacyPage.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(PrivacyPage);
