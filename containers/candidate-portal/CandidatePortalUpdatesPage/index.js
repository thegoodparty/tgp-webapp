/**
 *
 * CandidatePortalUpdatesPage
 *
 */

import React, { memo, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import TgpHelmet from '/components/shared/TgpHelmet';
import PortalUpdatesWrapper from '/components/candidate-portal/PortalUpdatesWrapper';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCandidatePortalUpdatesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import { getUserCookie } from '/helpers/cookieHelper';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export const PortalUpdatesPageContext = createContext();

export function CandidatePortalUpdatesPage({
  dispatch,
  userState,
  candidatePortalHomePage,
  newUpdateCallback,
  editUpdateCallback,
  deleteUpdateCallback,
}) {
  useInjectReducer({ key: 'candidatePortalUpdatesPage', reducer });
  useInjectSaga({ key: 'candidatePortalUpdatesPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });
  const router = useRouter();

  const { candidate, role } = candidatePortalHomePage;

  const { id } = router.query;

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }

  useEffect(() => {
    if (user && id) {
      dispatch(portalHomeActions.findCandidate(id));
    }
  }, [user, id]);

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
    }
  }, [id]);

  const childProps = {
    candidate,
    role,
    newUpdateCallback,
    editUpdateCallback,
    deleteUpdateCallback,
  };

  return (
    <PortalUpdatesPageContext.Provider value={childProps}>
      <TgpHelmet
        title="Campaign Updates - Candidate Portal"
        description="Campaign Updates - Candidate Portal"
      />
      {role ? <PortalUpdatesWrapper /> : <>Access Denied</>}
    </PortalUpdatesPageContext.Provider>
  );
}

CandidatePortalUpdatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  newUpdateCallback: PropTypes.func,
  editUpdateCallback: PropTypes.func,
  deleteUpdateCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidatePortalUpdatesPage: makeSelectCandidatePortalUpdatesPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    newUpdateCallback: (candidate, update) => {
      dispatch(portalHomeActions.createUpdateAction(candidate, update));
    },
    editUpdateCallback: (id, update) => {
      dispatch(actions.editUpdateAction(id, update));
    },
    deleteUpdateCallback: (id, candidateId) => {
      dispatch(actions.deleteUpdateAction(id, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatePortalUpdatesPage);
