/**
 *
 * Nav
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from 'containers/you/YouPage/selectors';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';

import NavWrapper from 'components/shared/navigation/NavWrapper';
import userActions from 'containers/you/YouPage/actions';
import candidateActions from 'containers/elections/CandidateNewPage/actions';

import makeSelectCandidate from '../../elections/CandidatePage/selectors';

export function Nav({ userState, dispatch, trackShareCallback }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const [user, setUser] = React.useState(null);
  const stateUser = userState.user;

  useEffect(() => {
    if (!stateUser) {
      dispatch(userActions.loadUserFromCookieAction());
      dispatch(userActions.generateUuidAction());
    } else {
      setUser(stateUser);
    }
  }, [stateUser]);

  const childProps = {
    user,
    trackShareCallback,
  };

  return <NavWrapper {...childProps} />;
}

Nav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  trackShareCallback: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
  candidateState: makeSelectCandidate(),
});

/* eslint-disable prefer-destructuring */
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    trackShareCallback: candidateId => {
      dispatch(candidateActions.trackShare(candidateId));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Nav);
