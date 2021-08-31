/**
 *
 * RegisterUpdatePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TgpHelmet from 'components/shared/TgpHelmet';
import RegisterWrapper from 'components/entrance/RegisterWrapper';
import { getUserCookie } from 'helpers/cookieHelper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegisterUpdatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function RegisterUpdatePage({ registerCallback }) {
  useInjectReducer({ key: 'registerUpdatePage', reducer });
  useInjectSaga({ key: 'registerUpdatePage', saga });

  const user = getUserCookie(true);
  const childProps = {
    user,
    registerCallback,
    isUpdate: true,
  };

  return (
    <div>
      <TgpHelmet
        title="Update Info | GOOD PARTY"
        description="update registration information for GOOD PARTY"
      />
      <RegisterWrapper {...childProps} />
    </div>
  );
}

RegisterUpdatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  registerCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  registerUpdatePage: makeSelectRegisterUpdatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerCallback: (name, email, phone, zip) => {
      dispatch(actions.registerUpdateAction(name, email, phone, zip));
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
)(RegisterUpdatePage);
