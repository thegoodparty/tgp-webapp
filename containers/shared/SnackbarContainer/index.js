/**
 *
 * SnackbarContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SnackbarWrapper from '/components/shared/SnackbarWrapper';

import { useInjectReducer } from '/utils/injectReducer';
import makeSelectSnackbarContainer from './selectors';
import reducer from './reducer';
import snackbarActions from './actions';

export function SnackbarContainer({ snackbarState, closeCallback }) {
  useInjectReducer({ key: 'snackbarContainer', reducer });

  const { message, severity, isOpen } = snackbarState;
  const childProps = {
    message,
    severity,
    isOpen,
    closeCallback,
  };

  return <SnackbarWrapper {...childProps} />;
}

SnackbarContainer.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  snackbarState: PropTypes.object,
  closeCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  snackbarState: makeSelectSnackbarContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeCallback: () => {
      dispatch(snackbarActions.hideSnakbarAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SnackbarContainer);
