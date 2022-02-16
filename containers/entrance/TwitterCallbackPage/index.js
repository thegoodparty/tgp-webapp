/**
 *
 * TwitterCallbackPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import queryHelper from '/helpers/queryHelper';
import LoadingAnimation from '/components/shared/LoadingAnimation';

import { useInjectSaga } from '/utils/injectSaga';
import { useInjectReducer } from '/utils/injectReducer';
import makeSelectTwitterCallbackPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLocation } from '../../App/selectors';
import actions from './actions';
import TgpHelmet from '../../../components/shared/TgpHelmet';

export function TwitterCallbackPage({ dispatch, locationState }) {
  useInjectReducer({ key: 'twitterCallbackPage', reducer });
  useInjectSaga({ key: 'twitterCallbackPage', saga });

  const { search } = locationState;
  const oauthToken = queryHelper(search, 'oauth_token');
  const oauthVerifier = queryHelper(search, 'oauth_verifier');

  useEffect(() => {
    if (oauthToken) {
      dispatch(actions.confirmTwitterCallbackAction(oauthToken, oauthVerifier));
    }
  }, [oauthToken]);

  return (
    <div>
      <TgpHelmet
        title="Twitter confirmation register | GOOD PARTY"
        description="Twitter confirmation register"
      />
      <LoadingAnimation />
    </div>
  );
}

TwitterCallbackPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  locationState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  twitterCallbackPage: makeSelectTwitterCallbackPage(),
  locationState: makeSelectLocation(),
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
)(TwitterCallbackPage);
