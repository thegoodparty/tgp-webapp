/**
 *
 * PartyPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loadInitialState } from 'utils/loadInitialState';

import {
  makeSelectAppVersion,
  makeSelectContent,
} from 'containers/App/selectors';

import PartyWrapper from 'components/party/PartyWrapper';
import TgpHelmet from 'components/shared/TgpHelmet';
import actions from '../../HomePage/actions';

export function PartyPage({ appVersion, ssrState }) {
  loadInitialState();
  let candidates;
  let pageContent;
  if (ssrState) {
    ({ candidates, pageContent } = ssrState);
  }

  const childProps = {
    pageContent,
    appVersion,
    candidates,
  };
  return (
    <div>
      <TgpHelmet
        title="About | GOOD PARTY"
        description="Learn about GOOD PARTY."
      />
      <PartyWrapper {...childProps} />
    </div>
  );
}

PartyPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appVersion: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
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
