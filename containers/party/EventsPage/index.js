/**
 *
 * EventsPage
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
import EventsWrapper from 'components/party/EventsWrapper';

export function EventsPage({ content }) {
  const router = useRouter()
  const childProps = {
    content,
    backButtonCallback: () => router.back(),
  };
  return (
    <div>
      <Head>
        <title data-cy="page-title">EventsPage</title>
        <meta name="description" content="Description of EventsPage" />
      </Head>
      <EventsWrapper {...childProps} />
    </div>
  );
}

EventsPage.propTypes = {
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
)(EventsPage);
