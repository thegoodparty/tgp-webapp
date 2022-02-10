/**
 *
 * RegisterBannerContainer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import RegisterBannerWrapper from '/components/shared/RegisterBannerWrapper';
import makeSelectUser, { makeSelectRanking } from '../../you/YouPage/selectors';
import { makeSelectLocation } from '../../App/selectors';
import userActions from '../../you/YouPage/actions';

export function RegisterBannerContainer({ userState, dispatch }) {
  const { user } = userState;
  if (!user) {
    return <></>;
  }

  if (user.isEmailVerified || user.isPhoneVerified) {
    return <></>;
  }

  const childProps = {
    user,
  };

  return <RegisterBannerWrapper {...childProps} />;
}

RegisterBannerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  locationState: PropTypes.object,
  rankingObj: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  userState: makeSelectUser(),
  locationState: makeSelectLocation(),
  rankingObj: makeSelectRanking(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterBannerContainer);
