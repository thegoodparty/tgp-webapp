/**
 *
 * StaffManagementPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import TgpHelmet from '/components/shared/TgpHelmet';
import StaffManagementWrapper from '/components/candidate-portal/StaffManagementWrapper';
import { getUserCookie } from '/helpers/cookieHelper';
import makeSelectUser from '/containers/you/YouPage/selectors';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectStaffManagementPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import { accessLevel } from '../CandidatePortalHomePage';

export function StaffManagementPage({
  staffManagementPage,
  candidatePortalHomePage,
  userState,
  dispatch,
  addStaffCallback,
  updateStaffCallback,
  deleteStaffCallback,
}) {
  useInjectReducer({ key: 'staffManagementPage', reducer });
  useInjectSaga({ key: 'staffManagementPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });
  const router = useRouter();

  const { staff, loading } = staffManagementPage;

  const { candidate, role } = candidatePortalHomePage;
  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
      dispatch(actions.loadStaffAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (user && id) {
      dispatch(portalHomeActions.findCandidate(id));
    }
  }, [user, id]);

  const childProps = {
    candidate,
    addStaffCallback,
    role,
    staff,
    updateStaffCallback,
    deleteStaffCallback,
    loading,
  };

  const access = accessLevel(role);

  return (
    <div>
      <TgpHelmet title="Staff Management" description="Staff Management" />
      {access > 15 ? (
        <StaffManagementWrapper {...childProps} />
      ) : (
        <>Access Denied</>
      )}
    </div>
  );
}

StaffManagementPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidatePortalHomePage: PropTypes.object,
  staffManagementPage: PropTypes.object,
  userState: PropTypes.object,
  updateStaffCallback: PropTypes.func,
  addStaffCallback: PropTypes.func,
  deleteStaffCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  staffManagementPage: makeSelectStaffManagementPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addStaffCallback: (email, role, id) => {
      dispatch(actions.addStaffAction(email, role, id));
    },
    updateStaffCallback: (userId, candidateId, role) => {
      dispatch(actions.updateStaffAction(userId, candidateId, role));
    },
    deleteStaffCallback: (id, candidateId) => {
      dispatch(actions.deleteStaffAction(id, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(StaffManagementPage);
