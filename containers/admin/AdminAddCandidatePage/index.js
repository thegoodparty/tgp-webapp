/**
 *
 * AdminAddCandidatePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminAddCandidateWrapper from '/components/admin/AdminAddCandidateWrapper';
import portalHomeSaga from '../../candidate-portal/CandidatePortalHomePage/saga';
import portalHomeReducer from '../../candidate-portal/CandidatePortalHomePage/reducer';
import makeSelectCandidatePortalHomePage from '../../candidate-portal/CandidatePortalHomePage/selectors';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminAddCandidatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminAddCandidatePage({
  createCandidateCallback,
  editCandidateCallback,
  candidatePortalHomePage,
  ssrState,
}) {
  useInjectReducer({ key: 'adminAddCandidatePage', reducer });
  useInjectSaga({ key: 'adminAddCandidatePage', saga });
  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });
  const { candidate, isPortal } = ssrState || {};
  const { role } = candidatePortalHomePage;
  const mode = candidate ? 'edit' : 'add';

  const childProps = {
    createCandidateCallback,
    editCandidateCallback,
    candidate,
    mode,
    isPortal,
    role
  };

  return (
    <div>
      <Helmet>
        <title>Admin Add Candidate</title>
      </Helmet>
      <AdminAddCandidateWrapper {...childProps} />
    </div>
  );
}

AdminAddCandidatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  createCandidateCallback: PropTypes.func,
  editCandidateCallback: PropTypes.func,
  ssrState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  adminAddCandidatePage: makeSelectAdminAddCandidatePage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createCandidateCallback: candidate => {
      dispatch(actions.createCandidateAction(candidate));
    },
    editCandidateCallback: candidate => {
      dispatch(actions.editCandidateAction(candidate));
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
)(AdminAddCandidatePage);
