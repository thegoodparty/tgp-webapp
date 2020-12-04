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

export function PartyPage({ content, appVersion }) {
  loadInitialState();
  // useEffect(() => {
  //   if (!content) {
  //     loadContent(dispatch);
  //   }
  // }, [content]);
  const childProps = {
    content,
    appVersion,
  };
  return (
    <div>
      <TgpHelmet
        title="Party | The Good Party"
        description="Party | The Good Party"
      />
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
