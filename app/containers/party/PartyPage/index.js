/**
 *
 * PartyPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectContent } from 'containers/App/selectors';
import globalActions from 'containers/App/actions';

import PartyWrapper from 'components/party/PartyWrapper';

export function PartyPage({ content, dispatch }) {
  useEffect(() => {
    if (!content) {
      dispatch(globalActions.loadContentAction());
    }
  }, []);

  const childProps = {
    content,
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
)(PartyPage);
