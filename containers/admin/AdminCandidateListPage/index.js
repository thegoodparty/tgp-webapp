/**
 *
 * AdminCandidateListPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import AdminCandidateList from '/components/admin/AdminCandidateList';
import TgpHelmet from '/components/shared/TgpHelmet';
import makeSelectUser from '/containers/you/YouPage/selectors';
import associateSaga from '/containers/admin/AdminAssociateCandidateUserPage/saga';
import associateActions from '/containers/admin/AdminAssociateCandidateUserPage/actions';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminCandidateListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminCandidateListPage({
  dispatch,
  adminCandidateListPage,
  deleteCandidateCallback,
  userState,
  logAsCandidateCallback,
}) {
  useInjectReducer({ key: 'adminCandidateListPage', reducer });
  useInjectSaga({ key: 'adminCandidateListPage', saga });

  useInjectSaga({
    key: 'adminAssociateCandidateUserPage',
    saga: associateSaga,
  });

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  });

  const { candidates } = adminCandidateListPage;

  useEffect(() => {
    dispatch(actions.loadCandidates());
  }, []);

  const childProps = {
    candidates,
    deleteCandidateCallback,
    logAsCandidateCallback,
  };

  return (
    <div>
      <TgpHelmet title="Admin Candidate List" />

      <AdminCandidateList {...childProps} />
    </div>
  );
}

AdminCandidateListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminCandidateListPage: PropTypes.object,
  userState: PropTypes.object,
  deleteCandidateCallback: PropTypes.func,
  logAsCandidateCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminCandidateListPage: makeSelectAdminCandidateListPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteCandidateCallback: id => dispatch(actions.deleteCandidateAction(id)),
    logAsCandidateCallback: id =>
      dispatch(associateActions.logAsCandidateCallbackAction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminCandidateListPage);
