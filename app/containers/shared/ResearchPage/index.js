/**
 *
 * ResearchPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ResearchWrapper from 'components/shared/ResearchWrapper';
import { makeSelectContent } from 'containers/App/selectors';

export function ResearchPage({ content }) {
  const childProps = {
    content,
  };
  return (
    <div>
      <Helmet>
        <title>Research | The Good Party</title>
        <meta name="description" content="Research | The Good Party" />
      </Helmet>
      <ResearchWrapper {...childProps} />
    </div>
  );
}

ResearchPage.propTypes = {
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
)(ResearchPage);
