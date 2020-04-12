/**
 *
 * DistrictPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import candidateReducer from 'containers/elections/CandidatePage/reducer';

import saga from 'containers/intro/ZipFinderPage/saga';
import reducer from 'containers/intro/ZipFinderPage/reducer';
import districtActions from 'containers/intro/ZipFinderPage/actions';
import makeSelectZipFinderPage from 'containers/intro/ZipFinderPage/selectors';
import DistrictWrapper from 'components/elections/DistrictWrapper';
import {
  makeSelectContent,
  makeSelectLocation,
} from 'containers/App/selectors';
import makeSelectUser from 'containers/you/YouPage/selectors';
import userActions from 'containers/you/YouPage/actions';
import {
  CHAMBER_ENUM,
  filterCandidates,
  getRankFromUserOrState,
} from 'helpers/electionsHelper';
import makeSelectCandidate from '../CandidatePage/selectors';
import candidateActions from '../CandidatePage/actions';

export function DistrictPage({
  content,
  districtState,
  zip,
  cd,
  dispatch,
  changeDistrictCallback,
  deleteRankingCallback,
  changeZipCallback,
  userState,
  candidateState,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  useInjectReducer({
    key: 'candidate',
    reducer: candidateReducer,
  });

  const [cdIndex, setCdIndex] = useState(0);
  const [presidentialCandidates, setPresidentialCandidates] = useState({});
  const [filteredHouse, setFilteredHouse] = useState({});
  const [filteredSenate, setFilteredSenate] = useState({});
  const [districtNum, setDistrictNum] = useState(0);
  const { user } = userState;

  const { zipWithDistricts, filters } = districtState;
  const {
    presidential,
    houseCandidates,
    senateCandidates,
    userCounts,
  } = districtState;

  useEffect(() => {
    if (!zipWithDistricts) {
      dispatch(districtActions.loadZipAction(zip));
    }
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
  }, [zip]);

  useEffect(() => {
    if (zipWithDistricts) {
      const { stateShort, cds, approxPctArr } = zipWithDistricts;

      const shortState = stateShort ? stateShort.toUpperCase() : '';
      let districtNumber;
      let tempCd = 0;
      const approxPct = approxPctArr ? JSON.parse(approxPctArr) : [];

      if (typeof cd !== 'undefined') {
        setCdIndex(parseInt(cd, 10));
        tempCd = parseInt(cd, 10);
      } else if (user && user.congDistrict && cds.length > 0) {
        // no cd was given in url, and the user already set their cd, show that one.
        approxPct.forEach((district, index) => {
          if (district.districtId === user.congDistrict) {
            setCdIndex(index);
            tempCd = index;
          }
        });
      }

      if (cds.length < cd) {
        dispatch(push(`/elections/district/${zip}`));
      } else if (cds && cds.length > tempCd) {
        cds.forEach(district => {
          if (district.id === approxPct[tempCd].districtId) {
            districtNumber = district.code;
            setDistrictNum(districtNumber);
          }
        });
      }

      if (shortState && districtNumber) {
        dispatch(
          districtActions.loadHouseCandidatesAction(shortState, districtNumber),
        );
      }

      if (!senateCandidates && shortState) {
        dispatch(districtActions.loadSenateCandidatesAction(shortState));
      }
      if (districtNumber) {
        dispatch(districtActions.userCountsAction(shortState, districtNumber));
      }
    }
  }, [zipWithDistricts, zip, cd, user]);


  useEffect(() => {
    const filtered = filterCandidates(
      presidential || [],
      filters,
      CHAMBER_ENUM.PRESIDENTIAL,
    );
    setPresidentialCandidates(filtered);
  }, [presidential, filters]);

  useEffect(() => {
    const filtered = filterCandidates(
      senateCandidates || [],
      filters,
      CHAMBER_ENUM.SENATE,
    );
    setFilteredSenate(filtered);
  }, [senateCandidates, filters]);

  const { stateShort } = zipWithDistricts;
  const presidentialRank = getRankFromUserOrState(
    user,
    candidateState,
    'presidentialRank',
  );

  let senateRank = getRankFromUserOrState(user, candidateState, 'senateRank');
  senateRank = senateRank ? senateRank[stateShort] : [];

  let houseRank = getRankFromUserOrState(user, candidateState, 'houseRank');
  houseRank = houseRank ? houseRank[stateShort + districtNum] : [];

  useEffect(() => {
    const filtered = filterCandidates(
      houseCandidates || [],
      filters,
      CHAMBER_ENUM.HOUSE,
    );
    setFilteredHouse(filtered);
  }, [houseCandidates, filters]);

  const childProps = {
    district: zipWithDistricts,
    cdIndex,
    presidential: presidentialCandidates,
    houseCandidates: filteredHouse,
    senateCandidates: filteredSenate,
    content,
    changeDistrictCallback,
    deleteRankingCallback,
    changeZipCallback,
    user,
    userCounts,
    presidentialRank,
    senateRank,
    houseRank,
  };

  return (
    <div>
      <Helmet>
        <title>Elections | District Page</title>
        <meta name="description" content="Elections | District Page" />
      </Helmet>
      <DistrictWrapper {...childProps} />
    </div>
  );
}

DistrictPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  districtState: PropTypes.object,
  zip: PropTypes.string,
  cd: PropTypes.string,
  changeDistrictCallback: PropTypes.func,
  deleteRankingCallback: PropTypes.func,
  changeZipCallback: PropTypes.func,
  userState: PropTypes.object,
  candidateState: PropTypes.object,
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    zip: ownProps.match.params.zip,
    cd: ownProps.match.params.cd,
    changeDistrictCallback: (districtId, districtIndex, zip, user) => {
      dispatch(push(`/elections/district/${zip}/${districtIndex}`));
      if (user) {
        dispatch(userActions.updateUserAction({ districtId }));
      }
    },
    deleteRankingCallback: (state, district) => {
      dispatch(
        candidateActions.saveRankHouseCandidateAction([], state, district),
      );
      dispatch(userActions.updateHouseRankAction([], state, district));
      dispatch(userActions.saveUserRankingAction([], 'house', state, district));
    },
    changeZipCallback: () => {
      dispatch(push('/intro/zip-finder'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  search: makeSelectLocation(),
  userState: makeSelectUser(),
  candidateState: makeSelectCandidate(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DistrictPage);
