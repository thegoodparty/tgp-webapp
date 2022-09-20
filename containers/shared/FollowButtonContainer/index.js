/**
 *
 * FollowButtonContainer
 *
 */

import React, { memo, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import FollowButtonWrapper from '/components/shared/FollowButtonWrapper';
import { getUserCookie } from '/helpers/cookieHelper';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectFollowButtonContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import actions from './actions';

export const FollowButtonContainerContext = createContext();

export function FollowButtonContainer({
  candidate,
  followCandidateCallback,
  deleteFollowCandidateCallback,
  dispatch,
  followButtonContainer,
}) {
  useInjectReducer({ key: 'followButtonContainer', reducer });
  useInjectSaga({ key: 'followButtonContainer', saga });
  const { supports } = followButtonContainer;

  const user = getUserCookie();

  useEffect(() => {
    if (user && !supports) {
      dispatch(actions.loadUserFollowsAction());
    }
  }, []);

  const childProps = {
    candidate,
    followCandidateCallback,
    deleteFollowCandidateCallback,
    supports,
  };

  return (
    <FollowButtonContainerContext.Provider value={childProps}>
      <FollowButtonWrapper />
    </FollowButtonContainerContext.Provider>
  );
}

FollowButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidate: PropTypes.object,
  followCandidateCallback: PropTypes.func,
  deleteFollowCandidateCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  followButtonContainer: makeSelectFollowButtonContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    followCandidateCallback: (candidateId) => {
      dispatch(actions.followCandidateAction(candidateId));
    },
    deleteFollowCandidateCallback: (candidateId) => {
      dispatch(actions.deleteFollowCandidateAction(candidateId));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FollowButtonContainer);
