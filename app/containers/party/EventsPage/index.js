/**
 *
 * EventsPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { goBack } from 'connected-react-router';

import { makeSelectContent } from 'containers/App/selectors';

import EventsWrapper from 'components/party/EventsWrapper';

export function EventsPage({ content, backButtonCallback }) {
  const childProps = {
    content,
    backButtonCallback,
  };
  return (
    <div>
      <Helmet>
        <title>EventsPage</title>
        <meta name="description" content="Description of EventsPage" />
      </Helmet>
      <EventsWrapper {...childProps} />
    </div>
  );
}

EventsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backButtonCallback: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    backButtonCallback: () => {
      dispatch(goBack());
    },
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
)(EventsPage);
