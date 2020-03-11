/**
 *
 * DistrictPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

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
import { getCookie } from 'helpers/cookieHelper';

export function DistrictPage({ content, districtState, zip, dispatch }) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  let { zipWithDistricts } = districtState;
  const {
    presidential,
    districtIncumbents,
    districtCandidates,
  } = districtState;

  useEffect(() => {
    if (!zipWithDistricts) {
      const zipCookie = getCookie('zip');
      if (zipCookie) {
        zipWithDistricts = JSON.parse(zipCookie);
        dispatch(districtActions.loadCookieZipAction());
      } else {
        dispatch(districtActions.loadZipAction(zip));
      }
    }
    if (!presidential) {
      dispatch(districtActions.loadAllPresidentialAction());
    }
    if (!content) {
      dispatch(globalActions.loadContentAction());
    }
  }, []);

  useEffect(() => {
    if (zipWithDistricts) {
      const { stateShort, cds } = zipWithDistricts;
      const shortState = stateShort ? stateShort.toUpperCase() : '';
      let districtNumber;
      if (cds && cds.length > 0) {
        districtNumber = cds[0].code;
      }
      if (shortState && districtNumber) {
        dispatch(
          districtActions.loadDistrictIncumbentsAction(
            shortState,
            districtNumber,
          ),
        );

        dispatch(
          districtActions.loadDistrictCandidatesAction(
            shortState,
            districtNumber,
          ),
        );
      }
    }
  }, [zipWithDistricts]);

  const childProps = {
    district: zipWithDistricts,
    presidential,
    districtIncumbents,
    districtCandidates,
    content,
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
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
    zip: ownProps.match.params.zip,
  };
}

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  districtState: makeSelectZipFinderPage(),
  search: makeSelectLocation(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DistrictPage);
