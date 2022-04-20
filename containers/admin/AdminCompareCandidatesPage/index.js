/**
 *
 * AdminCompareCandidatesPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import AdminCompareCandidatesWrapper from '/components/admin/AdminCompareCandidatesWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminCompareCandidatesPage from './selectors';
import adminCandidateImageReducer from '../AdminCandidateImagePage/reducer';
import saga from './saga';

import reducer from './reducer';
import actions from './actions';
import adminCandidateImageActions from '../AdminCandidateImagePage/actions';
import makeSelectAdminCandidateImagePage from '../AdminCandidateImagePage/selectors';
import adminReducer from '../AdminPage/reducer';
import adminSaga from '../AdminPage/saga';
import adminActions from '../AdminPage/actions';
import makeSelectAdminPage from '../AdminPage/selectors';

export function AdminCompareCandidatesPage({
  dispatch,
  adminCompareCandidatesPage,
  saveCallback,
  adminState,
}) {
  useInjectReducer({ key: 'adminCompareCandidatesPage', reducer });
  useInjectSaga({ key: 'adminCompareCandidatesPage', saga });
  useInjectReducer({
    key: 'adminCandidateImagePage',
    reducer: adminCandidateImageReducer,
  });

  useInjectReducer({ key: 'adminPage', reducer: adminReducer });
  useInjectSaga({ key: 'adminPage', saga: adminSaga });

  const router = useRouter();
  const { id } = router.query;
  const { candidate } = adminState;
  useEffect(() => {
    if (id) {
      dispatch(adminActions.loadCandidateAction(id));
      dispatch(actions.loadTopicsAction());
    }
  }, [id]);

  const { topics } = adminCompareCandidatesPage;

  const childProps = {
    candidate,
    saveCallback,
    topics,
  };

  return (
    <div>
      <Helmet>
        <title>AdminCompareCandidatesPage</title>
      </Helmet>
      <AdminCompareCandidatesWrapper {...childProps} />
    </div>
  );
}

AdminCompareCandidatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  adminCompareCandidatesPage: PropTypes.object,
  saveCallback: PropTypes.func,
  adminState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminCompareCandidatesPage: makeSelectAdminCompareCandidatesPage(),
  adminState: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: candidate => {
      dispatch(actions.updateComparedCandidateAction(candidate));
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
)(AdminCompareCandidatesPage);
