/**
 *
 * EditProfilePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { createStructuredSelector } from 'reselect';

import EditProfileWrapper from 'components/you/EditProfileWrapper';

export function EditProfilePage({ userState }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { user } = userState;

  const childProps = {
    user,
  };

  return (
    <div>
      <Helmet>
        <title>Edit Profile | The Good Party</title>
        <meta name="description" content="Edit Profile | The Good Party" />
      </Helmet>
      <EditProfileWrapper {...childProps} />
    </div>
  );
}

EditProfilePage.propTypes = {
  userState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
)(EditProfilePage);
