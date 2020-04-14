/**
 *
 * PartyPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectAppVersion, makeSelectContent } from 'containers/App/selectors';

import PartyWrapper from 'components/party/PartyWrapper';

export function PartyPage({ content, appVersion }) {
  const childProps = {
    content,
    appVersion
  };

  return (
    <div>
      <Helmet>
        <title>Party | The Good Party</title>
        <meta name="description" content="Party | The Good Party" />
      </Helmet>
      <PartyWrapper {...childProps} />
    </div>
  );
}

PartyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  appVersion: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  appVersion: makeSelectAppVersion(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PartyPage);
