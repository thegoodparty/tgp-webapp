/**
 *
 * AdminUpdateRequestsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminUpdateRequestsWrapper from 'components/admin/AdminUpdateRequestsWrapper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminIssueTopicsPage from '../AdminIssueTopicsPage/selectors';
import makeSelectAdminUpdateRequestsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export function AdminUpdateRequestsPage({
  dispatch,
  userState,
  adminUpdateRequestsPage,
  acceptRequestCallback,
  rejectRequestCallback,
}) {
  useInjectReducer({ key: 'adminUpdateRequestsPage', reducer });
  useInjectSaga({ key: 'adminUpdateRequestsPage', saga });

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);
  useEffect(() => {
    dispatch(actions.loadUgcsAction());
  }, []);

  const { ugc } = adminUpdateRequestsPage;

  const childProps = {
    ugc,
    acceptRequestCallback,
    rejectRequestCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Update Requests</title>
      </Helmet>
      <AdminUpdateRequestsWrapper {...childProps} />
    </div>
  );
}

AdminUpdateRequestsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminUpdateRequestsPage: PropTypes.object,
  userState: PropTypes.object,
  acceptRequestCallback: PropTypes.func,
  rejectRequestCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminUpdateRequestsPage: makeSelectAdminUpdateRequestsPage(),
  adminIssueTopicsPage: makeSelectAdminIssueTopicsPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    acceptRequestCallback: id => {
      dispatch(actions.acceptRequestAction(id));
    },
    rejectRequestCallback: id => {
      dispatch(actions.rejectRequestAction(id));
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
)(AdminUpdateRequestsPage);
