/**
 *
 * RegisterPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import RegisterWrapper from 'components/you/RegisterWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';

export function RegisterPage({ userState, registerCallback }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { loading, error } = userState;
  const childPros = {
    registerCallback,
    loading,
    error,
  };

  return (
    <div>
      <Helmet>
        <title>RegisterPage</title>
        <meta name="description" content="Description of RegisterPage" />
      </Helmet>
      <RegisterWrapper {...childPros} />
    </div>
  );
}

RegisterPage.propTypes = {
  userState: PropTypes.object,
  registerCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    registerCallback: (email, name, comments) => {
      dispatch(userActions.registerAction(email, name, comments));
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
)(RegisterPage);
