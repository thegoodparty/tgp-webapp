/**
 *
 * PortalEndorsementsPage
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TgpHelmet from '/components/shared/TgpHelmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import PortalEndorsementsWrapper from '/components/candidate-portal/PortalEndorsementsWrapper';

import makeSelectPortalEndorsementsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import { ACCESS_ENUM, accessLevel } from '../../../helpers/staffHelper';
import actions from './actions';

export const EndorsementsContext = createContext();

export function PortalEndorsementsPage({
  dispatch,
  candidatePortalHomePage,
  addEndorsementCallback,
  portalEndorsementsPage,
  deleteEndorsementCallback,
}) {
  useInjectReducer({ key: 'portalEndorsementsPage', reducer });
  useInjectSaga({ key: 'portalEndorsementsPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const router = useRouter();
  const { id } = router.query;
  const { candidate, role } = candidatePortalHomePage;
  const { endorsements } = portalEndorsementsPage;

  useEffect(() => {
    if (id) {
      dispatch(portalHomeActions.loadRoleAction(id));
      dispatch(portalHomeActions.findCandidate(id));
      dispatch(actions.loadEndorsementAction(id));
    }
  }, [id]);

  const access = accessLevel(role);

  const childProps = {
    candidate,
    role,
    id,
    endorsements,
    addEndorsementCallback,
    deleteEndorsementCallback,
  };

  return (
    <EndorsementsContext.Provider value={childProps}>
      <TgpHelmet
        title="Campaign Endorsements Page"
        description="Campaign Endorsements Page"
      />
      {access > ACCESS_ENUM.STAFF ? (
        <PortalEndorsementsWrapper />
      ) : (
        <>Access Denied</>
      )}
    </EndorsementsContext.Provider>
  );
}

PortalEndorsementsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidatePortalHomePage: PropTypes.object,
  addEndorsementCallback: PropTypes.func,
  deleteEndorsementCallback: PropTypes.func,
  portalEndorsementsPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  portalEndorsementsPage: makeSelectPortalEndorsementsPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addEndorsementCallback: (id, title, summary, link, image) => {
      dispatch(actions.addEndorsementAction(id, title, summary, link, image));
    },
    deleteEndorsementCallback: (id, candidateId) => {
      dispatch(actions.deleteEndorsementAction(id, candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PortalEndorsementsPage);
