/**
 *
 * RegisterStep2Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { createStructuredSelector } from 'reselect';

import RegisterStep2Wrapper from 'components/you/RegisterStep2Wrapper';
import { getSignupRedirectCookie } from '../../../helpers/cookieHelper';

export function RegisterStep2Page({ userState, submitCallback, location }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });
  const { user, loading } = userState;
  const childProps = {
    user,
    submitCallback,
    loading,
  };

  return (
    <div>
      <Helmet>
        <title>Register 2nd Step</title>
        <meta name="description" content="Register 2nd Step" />
      </Helmet>
      <RegisterStep2Wrapper {...childProps} />
    </div>
  );
}

RegisterStep2Page.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  submitCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitCallback: (feedback, photo) => {
      if (feedback) {
        dispatch(
          userActions.updateUserAction({
            feedback,
          }),
        );
      }
      if (photo) {
        dispatch(
          userActions.uploadAvatarAction(photo.pictureFile, photo.pictureData),
        );
      }
      const cookieRedirect = getSignupRedirectCookie();
      if (cookieRedirect) {
        dispatch(push(cookieRedirect.route));
      } else if (redirect) {
        dispatch(push(`${redirect}`));
      } else {
        dispatch(push('/you'));
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterStep2Page);
