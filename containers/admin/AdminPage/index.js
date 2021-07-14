/**
 *
 * AdminPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminWrapper from 'components/admin/AdminWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';

export function AdminPage({ userState, dispatch }) {
  useInjectReducer({ key: 'adminPage', reducer });
  useInjectSaga({ key: 'adminPage', saga });

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
      </Head>
      <AdminWrapper />
    </div>
  );
}

AdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // adminState: makeSelectAdminPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminPage);
