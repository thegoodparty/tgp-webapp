/**
 *
 * TwitterCallbackPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from 'containers/you/YouPage/reducer';
import saga from 'containers/you/YouPage/saga';
import userActions from 'containers/you/YouPage/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import queryHelper from '../../../helpers/queryHelper';
import LoadingAnimation from '../../../components/shared/LoadingAnimation';

export function TwitterCallbackPage({ dispatch, locationState }) {
  useInjectReducer({ key: 'user', reducer });
  useInjectSaga({ key: 'user', saga });

  const { search } = locationState;
  const oauthToken = queryHelper(search, 'oauth_token');
  const oauthVerifier = queryHelper(search, 'oauth_verifier');

  useEffect(() => {
    dispatch(
      userActions.confirmTwitterCallbackAction(oauthToken, oauthVerifier),
    );
  }, []);

  return <LoadingAnimation />;
}

TwitterCallbackPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  locationState: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TwitterCallbackPage);
