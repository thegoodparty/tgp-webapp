/**
 *
 * StaffManagementPage
 *
 */

import React, { memo, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import TgpHelmet from '/components/shared/TgpHelmet';
import StaffManagementWrapper from '/components/candidate-portal/StaffManagementWrapper';
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
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';

export const StaffManagementPageContext = createContext();

export function StaffManagementPage({
  staffManagementPage,
  candidatePortalHomePage,
  dispatch,
  addStaffCallback,
  updateStaffCallback,
  deleteStaffCallback,
  deleteInvitationCallback,
}) {
  useInjectReducer({ key: 'staffManagementPage', reducer });
  useInjectSaga({ key: 'staffManagementPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const router = useRouter();
  const { id } = router.query;

  const { staff, staffInvitations, loading } = staffManagementPage;

  const { candidate, role } = candidatePortalHomePage;

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
      dispatch(actions.loadStaffAction(id));
      dispatch(portalHomeActions.findCandidate(id));
    }
  }, [id]);

  const childProps = {
    candidate,
    addStaffCallback,
    role,
    staff,
    staffInvitations,
    updateStaffCallback,
    deleteStaffCallback,
    loading,
    deleteInvitationCallback,
  };

  const access = accessLevel(role);

  return (
    <StaffManagementPageContext.Provider value={childProps}>
      <TgpHelmet title="Staff Management" description="Staff Management" />
      {access > ACCESS_ENUM.STAFF ? (
        <StaffManagementWrapper />
      ) : (
        <>Access Denied</>
      )}
    </StaffManagementPageContext.Provider>
  );
}

StaffManagementPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidatePortalHomePage: PropTypes.object,
  staffManagementPage: PropTypes.object,
  updateStaffCallback: PropTypes.func,
  addStaffCallback: PropTypes.func,
  deleteStaffCallback: PropTypes.func,
  deleteInvitationCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  staffManagementPage: makeSelectStaffManagementPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addStaffCallback: (name, email, role, id) => {
      dispatch(actions.addStaffAction(name, email, role, id));
    },
    updateStaffCallback: (userId, candidateId, role) => {
      dispatch(actions.updateStaffAction(userId, candidateId, role));
    },
    deleteStaffCallback: (id, candidateId) => {
      dispatch(actions.deleteStaffAction(id, candidateId));
    },
    deleteInvitationCallback: (id, candidateId) => {
      dispatch(actions.deleteInvitationAction(id, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(StaffManagementPage);
