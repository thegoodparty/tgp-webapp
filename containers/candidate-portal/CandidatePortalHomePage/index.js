/**
 *
 * CandidatePortalHomePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouter } from 'next/router';

import TgpHelmet from '/components/shared/TgpHelmet';
import CandidatePortalHomeWrapper from '/components/candidate-portal/CandidatePortalHomeWrapper';
import { getUserCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCandidatePortalHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';


export const accessLevel = (role) => {
  if (!role) {
    return 0;
  }
  if (role === 'staff') {
    return 10;
  }
  if (role === 'manager') {
    return 20;
  }
  if (role === 'owner' || role === 'admin') {
    return 30;
  }
};

export function CandidatePortalHomePage({
  userState,
  dispatch,
  candidatePortalHomePage,
  loadStatsCallback,
}) {
  useInjectReducer({ key: 'candidatePortalHomePage', reducer });
  useInjectSaga({ key: 'candidatePortalHomePage', saga });
  const { candidate, stats, role } = candidatePortalHomePage;
  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }

  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(actions.loadRoleAction(id));
      if (!stats) {
        dispatch(actions.loadStatsAction('Last Week', id));
      }
    }
  }, [id]);

  useEffect(() => {
    if (!candidate && id) {
      dispatch(actions.findCandidate(id));
    }
  }, [id, candidate]);

  const childProps = {
    candidate,
    user,
    stats,
    loadStatsCallback,
    role
  };

  return (
    <div>
      <TgpHelmet title="Candidate Portal" description="Candidate Portal" />
      {role ? (
        <CandidatePortalHomeWrapper {...childProps} />
      ) : (
        <>Access Denied</>
      )}
    </div>
  );
}

CandidatePortalHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
  loadStatsCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadStatsCallback: (range) => {
      dispatch(actions.loadStatsAction(range));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CandidatePortalHomePage);
