/**
 *
 * RegisterBannerContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import candidateReducer from 'containers/elections/CandidatePage/reducer';

import RegisterBannerWrapper from 'components/shared/RegisterBannerWrapper';
import makeSelectCandidate from '../../elections/CandidatePage/selectors';
import makeSelectUser from '../../you/YouPage/selectors';
import { getRankFromUserOrState } from '../../../helpers/electionsHelper';
import { makeSelectLocation } from '../../App/selectors';

export function RegisterBannerContainer({
  userState,
  candidateState,
  locationState,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  const { user } = userState;
  const { pathname } = locationState;

  const presidentialRank = getRankFromUserOrState(
    user,
    candidateState,
    'presidentialRank',
  );
  const senateRank = getRankFromUserOrState(user, candidateState, 'senateRank');
  const houseRank = getRankFromUserOrState(user, candidateState, 'houseRank');

  const presidentialCount = presidentialRank ? presidentialRank.length : 0;

  let senateCount = 0;
  if (senateRank) {
    const senateState = Object.keys(senateRank)[0];
    if (senateState && senateRank[senateState]) {
      senateCount = senateRank[senateState].length;
    }
  }

  let houseCount = 0;
  if (houseRank) {
    const houseDistrict = Object.keys(houseRank)[0];
    if (houseDistrict && houseRank[houseDistrict]) {
      houseCount = houseRank[houseDistrict].length;
    }
  }

  const count = presidentialCount + senateCount + houseCount;

  let showBanner = true;
  if (user) {
    showBanner = false;
  }
  if (count === 0) {
    showBanner = false;
  }
  if (pathname.includes('register')) {
    showBanner = false;
  }

  const childProps = {
    count,
    showBanner,
  };
  return <RegisterBannerWrapper {...childProps} />;
}

RegisterBannerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userState: PropTypes.object,
  candidateState: PropTypes.object,
  locationState: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  candidateState: makeSelectCandidate(),
  userState: makeSelectUser(),
  locationState: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterBannerContainer);
