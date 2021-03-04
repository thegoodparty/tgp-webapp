/**
 *
 * CandidatesPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CandidatesWrapper from 'components/CandidatesWrapper';
import { makeSelectContent } from '../App/selectors';

export function CandidatesPage({ ssrState, content }) {
  let candidates = [];
  if (ssrState) {
    ({ candidates } = ssrState);
  }
  const childProps = {
    candidates,
    content,
  };

  return (
    <div>
      <Head>
        <title>Meet the Candidates</title>
      </Head>
      <CandidatesWrapper {...childProps} />
    </div>
  );
}

CandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  homeState: PropTypes.object,
  ssrState: PropTypes.object,
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
)(CandidatesPage);
