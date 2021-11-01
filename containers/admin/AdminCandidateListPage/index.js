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

import AdminCandidateList from 'components/admin/AdminCandidateList';
import TgpHelmet from 'components/shared/TgpHelmet';
import makeSelectUser from 'containers/you/YouPage/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminCandidateListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminCandidateListPage({
  dispatch,
  adminCandidateListPage,
  deleteCandidateCallback,
  userState,
}) {
  useInjectReducer({ key: 'adminCandidateListPage', reducer });
  useInjectSaga({ key: 'adminCandidateListPage', saga });

  const { user } = userState;
  useEffect(() => {
    if (user && !user.isAdmin) {
      dispatch(push('/'));
    }
  });

  const { candidates } = adminCandidateListPage;

  useEffect(() => {
    dispatch(actions.loadCandidates('local'));
  }, []);

  const childProps = {
    candidates,
    deleteCandidateCallback,
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
};

const mapStateToProps = createStructuredSelector({
  adminCandidateListPage: makeSelectAdminCandidateListPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteCandidateCallback: id => dispatch(actions.deleteCandidateAction(id)),

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
