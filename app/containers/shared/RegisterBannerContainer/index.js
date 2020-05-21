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

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/intro/ZipFinderPage/reducer';

import RegisterBannerWrapper, {
  Spacer,
} from 'components/shared/RegisterBannerWrapper';
import makeSelectUser, { makeSelectRanking } from '../../you/YouPage/selectors';
import { makeSelectLocation } from '../../App/selectors';
import userActions from '../../you/YouPage/actions';
import { candidateFirstName } from '../../../helpers/electionsHelper';

export function RegisterBannerContainer({
  userState,
  locationState,
  rankingObj,
  dispatch,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });

  const { user, ranking } = userState;
  useEffect(() => {
    if (!user && !ranking) {
      dispatch(userActions.guestRankingAction());
    }
  }, [ranking]);

  if (user) {
    return <Spacer />;
  }

  const { pathname } = locationState;

  const presidentialRank = rankingObj['presidential'];
  const senateRank = rankingObj['senate'];
  const houseRank = rankingObj['house'];

  const presidentialRankArr = Object.keys(presidentialRank);
  const senateRankArr = Object.keys(senateRank);
  const houseRankArr = Object.keys(houseRank);

  const presidentialCount = presidentialRankArr.length;
  const senateCount = senateRankArr.length;
  const houseCount = houseRankArr.length;

  let blocName = '';
  if (presidentialCount > 0) {
    blocName = rankingObj.presidential[presidentialRankArr[0]].candName;
  } else if (senateCount > 0) {
    blocName = rankingObjsenate[senateRankArr[0]].candName;
  } else if (houseRank > 0) {
    blocName = rankingObj.house[houseRankArr[0]].candName;
  }

  blocName = blocName !== '' ? candidateFirstName({ name: blocName }) : '';

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
    blocName,
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
