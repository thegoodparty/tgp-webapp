/**
 *
 * FaqListPage
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

import FaqListWrapper from 'components/party/FaqListWrapper';

export function FaqListPage({ content, dispatch }) {
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
        <title>FAQs | The Good Party</title>
        <meta name="description" content="Frequently Asked Questions" />
      </Helmet>
      <FaqListWrapper {...childProps} />
    </div>
  );
}

FaqListPage.propTypes = {
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
)(FaqListPage);
