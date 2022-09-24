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
import actions from '../FollowButtonContainer/actions';
import registerActions from '../../entrance/RegisterPage/actions';

export const RegisterComboContainerContext = createContext();

export function RegisterComboContainer({
  registerCallback,
  afterRegisterCallback,
  afterLoginRoute,
}) {
  useInjectReducer({ key: 'registerComboContainer', reducer });
  useInjectSaga({ key: 'registerComboContainer', saga });

  const childProps = {
    registerCallback,
    afterRegisterCallback,
    afterLoginRoute,
  };

  return (
    <RegisterComboContainerContext.Provider value={childProps}>
      <RegisterComboWrapper />
    </RegisterComboContainerContext.Provider>
  );
}

RegisterComboContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerCallback: PropTypes.func,
  afterRegisterCallback: PropTypes.func,
  afterLoginRoute: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  registerComboContainer: makeSelectRegisterComboContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerCallback: (email, name, zip, afterRegisterCallback = () => {}) => {
      dispatch(
        registerActions.registerAction(
          name,
          email,
          undefined,
          zip,
          afterRegisterCallback,
          'voteModal',
        ),
      );
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RegisterComboContainer);
