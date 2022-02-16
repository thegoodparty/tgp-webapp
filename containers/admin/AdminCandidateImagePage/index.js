/**
 *
 * AdminCandidateImagePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import AdminCandidateImageWrapper from '/components/admin/AdminCandidateImageWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

import adminActions from '../AdminPage/actions';
import adminReducer from '../AdminPage/reducer';
import adminSaga from '../AdminPage/saga';
import makeSelectAdminPage from '../AdminPage/selectors';

export function AdminCandidateImagePage({
  dispatch,
  saveCallback,
  adminState,
}) {
  useInjectReducer({ key: 'adminCandidateImagePage', reducer });
  useInjectSaga({ key: 'adminCandidateImagePage', saga });

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
  };

  return (
    <div>
      <Helmet>
        <title>Admin Candidate Image</title>
      </Helmet>
      <AdminCandidateImageWrapper {...childProps} />
    </div>
  );
}

AdminCandidateImagePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ssrState: PropTypes.object,
  saveCallback: PropTypes.func,
  adminState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminState: makeSelectAdminPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: candidate => {
      dispatch(actions.updateCandidateImageAction(candidate));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AdminCandidateImagePage);
