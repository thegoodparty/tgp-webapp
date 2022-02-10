/**
 *
 * CandidatePortalUpdatesPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from '/components/shared/TgpHelmet';
import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectCandidatePortalUpdatesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import CandidatePortalUpdatesContainer from './CandidatePortalUpdatesContainer';
import portalHomeReducer from '../CandidatePortalHomePage/reducer';
import portalHomeSaga from '../CandidatePortalHomePage/saga';
import { getUserCookie } from '../../../helpers/cookieHelper';
import portalHomeActions from '../CandidatePortalHomePage/actions';
import makeSelectCandidatePortalHomePage from '../CandidatePortalHomePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';

export function CandidatePortalUpdatesPage({
  dispatch,
  userState,
  candidatePortalHomePage,
}) {
  useInjectReducer({ key: 'candidatePortalUpdatesPage', reducer });
  useInjectSaga({ key: 'candidatePortalUpdatesPage', saga });

  useInjectReducer({
    key: 'candidatePortalHomePage',
    reducer: portalHomeReducer,
  });
  useInjectSaga({ key: 'candidatePortalHomePage', saga: portalHomeSaga });

  const { candidate } = candidatePortalHomePage;

  let { user } = userState;
  if (!user) {
    user = getUserCookie(true);
  }
  useEffect(() => {
    if (user) {
      if (!user.isAdmin && !user.candidate) {
        dispatch(push('/'));
      }
      dispatch(portalHomeActions.findCandidate());
    }
  }, [user]);

  const childProps = {
    candidate,
    pageLevel: true,
  };

  return (
    <div>
      <TgpHelmet
        title="Campaign Updates - Candidate Portal"
        description="Campaign Updates - Candidate Portal"
      />
      {candidate && <CandidatePortalUpdatesContainer {...childProps} />}
    </div>
  );
}

CandidatePortalUpdatesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  candidatePortalUpdatesPage: makeSelectCandidatePortalUpdatesPage(),
  candidatePortalHomePage: makeSelectCandidatePortalHomePage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CandidatePortalUpdatesPage);
