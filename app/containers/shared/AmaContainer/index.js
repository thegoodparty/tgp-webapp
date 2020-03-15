/**
 *
 * AmaContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Ama from 'components/shared/Ama';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import amaActions from './actions';

export function AmaContainer({ sendAmaCallback }) {
  useInjectSaga({ key: 'amaContainer', saga });

  const childProps = {
    sendAmaCallback,
  };

  return <Ama {...childProps} />;
}

AmaContainer.propTypes = {
  sendAmaCallback: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    sendAmaCallback: message => {
      dispatch(amaActions.sendAma(message));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AmaContainer);
