/**
 *
 * ConfirmationSentPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import ConfirmationSentWrapper from 'components/you/ConfirmationSentWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { getCookie } from 'helpers/cookieHelper';

export function ConfirmationSentPage({
  userState,
  emailSendCallback,
  dispatch,
}) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  let { user } = userState;
  const stateEmail = user ? user.email : '';

  const [email, setEmail] = useState(stateEmail);
  useEffect(() => {
    if (!user) {
      user = getCookie('user');
      if (!user) {
        dispatch(push('/'));
      } else {
        setEmail(JSON.parse(user).email);
      }
    }
  }, []);
  const childProps = { email, emailSendCallback };
  console.log(childProps);
  return (
    <div>
      <Helmet>
        <title>Email Confirmation Sent | The Good Party</title>
        <meta
          name="description"
          content="Email Confirmation Sent | The Good Party"
        />
      </Helmet>
      <ConfirmationSentWrapper {...childProps} />
    </div>
  );
}

ConfirmationSentPage.propTypes = {
  dispatch: PropTypes.func,
  userState: PropTypes.object,
  emailSendCallback: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    emailSendCallback: () => {
      dispatch(userActions.resendEmailAction());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmationSentPage);
