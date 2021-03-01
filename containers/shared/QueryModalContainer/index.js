/**
 *
 * QueryModalContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-next-router';
import QueryModal from 'components/shared/QueryModal';

export function QueryModalContainer({
  closeModalCallback,
  modalStyles = {},
  children,
  mode = 'white',
  zIndex = 1300,
}) {
  const childProps = {
    closeModalCallback,
    modalStyles,
    mode,
    zIndex,
  };
  return <QueryModal {...childProps}>{children}</QueryModal>;
}

QueryModalContainer.propTypes = {
  closeModalCallback: PropTypes.func,
  modalStyles: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  mode: PropTypes.string,
  zIndex: PropTypes.number,
};

function mapDispatchToProps(dispatch) {
  return {
    closeModalCallback: () => {
      dispatch(push(window.location.pathname));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(QueryModalContainer);
