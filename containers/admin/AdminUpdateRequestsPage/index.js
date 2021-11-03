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
import adminIssueTopicsPageReducer from '../AdminIssueTopicsPage/reducer';
import makeSelectAdminIssueTopicsPage from '../AdminIssueTopicsPage/selectors';
import adminIssueTopicsSaga from '../AdminIssueTopicsPage/saga';
import adminIssueTopicsActions from '../AdminIssueTopicsPage/actions';
import makeSelectAdminUpdateRequestsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export function AdminUpdateRequestsPage({
  dispatch,
  userState,
  adminUpdateRequestsPage,
  adminIssueTopicsPage,
  acceptRequestCallback,
  rejectRequestCallback,
  acceptIssueRequestCallback,
  rejectIssueRequestCallback
}) {
  useInjectReducer({ key: 'adminUpdateRequestsPage', reducer });
  useInjectSaga({ key: 'adminUpdateRequestsPage', saga });

  useInjectReducer({
    key: 'adminIssueTopicsPage',
    reducer: adminIssueTopicsPageReducer,
  });
  useInjectSaga({ key: 'adminIssueTopicsPage', saga: adminIssueTopicsSaga });

  const { user } = userState;
  useEffect(() => {
    dispatch(adminIssueTopicsActions.loadIssueTopicsAction());
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  }, [user]);
  useEffect(() => {
    dispatch(actions.loadUgcsAction());
    dispatch(actions.loadTopIssuesAction());
  }, []);

  const { ugc, topIssues } = adminUpdateRequestsPage;
  const { topics } = adminIssueTopicsPage;

  const childProps = {
    ugc,
    topics,
    topIssues,
    acceptRequestCallback,
    rejectRequestCallback,
    acceptIssueRequestCallback,
    rejectIssueRequestCallback,
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
  acceptIssueRequestCallback: PropTypes.func,
  rejectIssueRequestCallback: PropTypes.func,
  adminIssueTopicsPage: PropTypes.object,
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
    acceptIssueRequestCallback: id => {
      dispatch(actions.acceptIssueRequestAction(id));
    },
    rejectIssueRequestCallback: id => {
      dispatch(actions.rejectIssueRequestAction(id));
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
