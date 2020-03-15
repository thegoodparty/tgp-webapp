/**
 *
 * AmaContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Ama from 'components/shared/Ama';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAmaContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import amaActions from './actions';

export function AmaContainer({ sendAmaCallback }) {
  useInjectReducer({ key: 'amaContainer', reducer });
  useInjectSaga({ key: 'amaContainer', saga });

  const childProps = {
    sendAmaCallback,
  };

  return <Ama {...childProps} />;
}

AmaContainer.propTypes = {
  sendAmaCallback: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  amaContainer: makeSelectAmaContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendAmaCallback: message => {
      dispatch(amaActions.sendAma(message));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AmaContainer);
