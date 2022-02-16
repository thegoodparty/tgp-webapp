/**
 *
 * AdminAssociateCandidateUserPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AdminAssociateCandidateUserWrapper from '/components/admin/AdminAssociateCandidateUserWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectAdminAssociateCandidateUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export function AdminAssociateCandidateUserPage({
  dispatch,
  ssrState,
  saveCallback,
  adminAssociateCandidateUserPage,
  removeUserCallback,
  logAsCandidateCallback,
}) {
  useInjectReducer({ key: 'adminAssociateCandidateUserPage', reducer });
  useInjectSaga({ key: 'adminAssociateCandidateUserPage', saga });

  const { candidate } = ssrState || {};
  const { user } = adminAssociateCandidateUserPage;
  useEffect(() => {
    dispatch(actions.findAssociatedUserAction(candidate.id));
  }, [candidate]);

  const childProps = {
    candidate,
    saveCallback,
    removeUserCallback,
    logAsCandidateCallback,
    user,
  };

  return (
    <div>
      <Helmet>
        <title>Admin Associate Candidate To User</title>
      </Helmet>
      <AdminAssociateCandidateUserWrapper {...childProps} />
    </div>
  );
}

AdminAssociateCandidateUserPage.propTypes = {
  dispatch: PropTypes.func,
  ssrState: PropTypes.object,
  adminAssociateCandidateUserPage: PropTypes.object,
  saveCallback: PropTypes.func,
  removeUserCallback: PropTypes.func,
  logAsCandidateCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminAssociateCandidateUserPage: makeSelectAdminAssociateCandidateUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: (candidateId, userEmail) => {
      dispatch(actions.associateCandidateUserAction(candidateId, userEmail));
    },
    removeUserCallback: candidateId => {
      dispatch(actions.removeAssociatedUserAction(candidateId));
    },
    logAsCandidateCallback: id =>
      dispatch(actions.logAsCandidateCallbackAction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminAssociateCandidateUserPage);
