/**
 *
 * CandidatePortalHomePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import TgpHelmet from 'components/shared/TgpHelmet';
import CandidatePortalHomeWrapper from 'components/candidate-portal/CandidatePortalHomeWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCandidatePortalHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectUser from '../../you/YouPage/selectors';
import actions from './actions';
import { getUserCookie } from '../../../helpers/cookieHelper';

export function CandidatePortalHomePage({
  userState,
  dispatch,
  candidatePortalHomePage,
}) {
  useInjectReducer({ key: 'candidatePortalHomePage', reducer });
  useInjectSaga({ key: 'candidatePortalHomePage', saga });
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
      dispatch(actions.findCandidate());
    }
  }, [user]);

  const childProps = {
    candidate,
    user,
  };

  console.log('portal page', candidate, user, candidatePortalHomePage);

  return (
    <div>
      <TgpHelmet title="Candidate Portal" description="Candidate Portal" />
      {user && <CandidatePortalHomeWrapper {...childProps} />}
    </div>
  );
}

CandidatePortalHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidatePortalHomePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
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
)(CandidatePortalHomePage);
