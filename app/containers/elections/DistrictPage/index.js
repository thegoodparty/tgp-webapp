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
import globalActions from 'containers/App/actions';
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

export function DistrictPage({
  content,
  districtState,
  zip,
  cd,
  dispatch,
  changeDistrictCallback,
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
  const { user } = userState;

  const { zipWithDistricts, filters } = districtState;
  const {
    presidential,
    houseCandidates,
    senateCandidates,
    geoLocation,
    userCounts,
  } = districtState;

  useEffect(() => {
    if (!zipWithDistricts) {
      dispatch(districtActions.loadZipAction(zip));
    }
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
    if (!content) {
      dispatch(globalActions.loadContentAction());
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
      dispatch(districtActions.userCountsAction(shortState, districtNumber));
    }
  }, [zipWithDistricts, zip, cd, user]);

  useEffect(() => {
    if (geoLocation) {
      const { state, district } = geoLocation;
      const shortState = state ? state.toUpperCase() : '';
      const districtNumber = district ? district.code : null;

      if (!houseCandidates && shortState && districtNumber) {
        dispatch(
          districtActions.loadHouseCandidatesAction(shortState, districtNumber),
        );
      }

      if (!senateCandidates && shortState) {
        dispatch(districtActions.loadSenateCandidatesAction(shortState));
      }
    }
  }, [geoLocation]);

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

  const presidentialRank = getRankFromUserOrState(
    user,
    candidateState,
    'presidentialRank',
  );

  const senateRank = getRankFromUserOrState(user, candidateState, 'senateRank');

  const houseRank = getRankFromUserOrState(user, candidateState, 'houseRank');

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
    geoLocation,
    presidential: presidentialCandidates,
    houseCandidates: filteredHouse,
    senateCandidates: filteredSenate,
    content,
    changeDistrictCallback,
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
