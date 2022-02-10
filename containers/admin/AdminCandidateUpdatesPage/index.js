/**
 *
 * AdminCandidateUpdatesPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import AdminCandidateUpdatesWrapper from '/components/admin/AdminCandidateUpdatesWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminCandidateUpdatesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import adminReducer from '../AdminPage/reducer';
import adminSaga from '../AdminPage/saga';
import adminActions from '../AdminPage/actions';
import makeSelectAdminPage from '../AdminPage/selectors';
import actions from './actions';

export function AdminCandidateUpdatesPage({
  dispatch,
  adminState,
  saveCallback,
  deleteCallback,
  createCallback,
  approveUpdateCallback,
}) {
  useInjectReducer({ key: 'adminCandidateUpdatesPage', reducer });
  useInjectSaga({ key: 'adminCandidateUpdatesPage', saga });

  useInjectReducer({ key: 'adminPage', reducer: adminReducer });
  useInjectSaga({ key: 'adminPage', saga: adminSaga });

  const router = useRouter();
  const { id } = router.query;

  const { candidate } = adminState;
  useEffect(() => {
    if (id) {
      dispatch(adminActions.loadCandidateAction(id));
    }
  }, [id]);

  const childProps = {
    candidate,
    saveCallback,
    deleteCallback,
    createCallback,
    approveUpdateCallback,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Candidate Updates</title>
      </Helmet>
      <AdminCandidateUpdatesWrapper {...childProps} />
    </div>
  );
}

AdminCandidateUpdatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adminState: PropTypes.object,
  saveCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  createCallback: PropTypes.func,
  approveUpdateCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminCandidateUpdatesPage: makeSelectAdminCandidateUpdatesPage(),
  adminState: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: (update, candidateId) => {
      dispatch(actions.saveUpdateAction(update, candidateId));
    },
    deleteCallback: (updateId, candidateId) => {
      dispatch(actions.deleteUpdateAction(updateId, candidateId));
    },
    createCallback: (update, candidateId) => {
      dispatch(actions.createUpdateAction(update, candidateId));
    },
    approveUpdateCallback: (updateId, candidateId) => {
      dispatch(actions.approveUpdateAction(updateId, candidateId));
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
)(AdminCandidateUpdatesPage);
