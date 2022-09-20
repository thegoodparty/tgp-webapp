/**
 *
 * RegisterComboContainer
 *
 */

import React, { memo, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import RegisterComboWrapper from '/components/shared/RegisterComboWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectRegisterComboContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

export const RegisterComboContainerContext = createContext();

export function RegisterComboContainer() {
  useInjectReducer({ key: 'registerComboContainer', reducer });
  useInjectSaga({ key: 'registerComboContainer', saga });

  const childProps = {};

  return (
    <RegisterComboContainerContext.Provider value={childProps}>
      <RegisterComboWrapper />
    </RegisterComboContainerContext.Provider>
  );
}

RegisterComboContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  registerComboContainer: makeSelectRegisterComboContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RegisterComboContainer);
