/**
 *
 * PortalAdminPage
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import { getUserCookie } from '/helpers/cookieHelper';
import PortalAdminWrapper from '/components/candidate-portal/PortalAdminWrapper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectPortalAdminPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';

export const PortalAdminPageContext = createContext();

export function PortalAdminPage({
  dispatch,
  candidatePortalHomePage,
  userState,
  saveCallback,
  approveClaimCallback,
}) {
  useInjectReducer({ key: 'portalAdminPage', reducer });
  useInjectSaga({ key: 'portalAdminPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const router = useRouter();
  const { id } = router.query;

  const { candidate } = candidatePortalHomePage;
  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.findCandidate(id));
    }
  }, [id]);

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }

  const childProps = { candidate, saveCallback, approveClaimCallback };

  return (
    <PortalAdminPageContext.Provider value={childProps}>
      <TgpHelmet title="Portal Admin Page" />
      {user?.isAdmin ? <PortalAdminWrapper /> : <>Access Denied</>}
    </PortalAdminPageContext.Provider>
  );
}

PortalAdminPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  saveCallback: PropTypes.func,
  approveClaimCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  portalAdminPage: makeSelectPortalAdminPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    saveCallback: (fields) => {
      dispatch(actions.updateCandidateAction(fields));
    },
    approveClaimCallback: (email, candidadeId) => {
      dispatch(actions.approveClaimAction(email, candidadeId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PortalAdminPage);
