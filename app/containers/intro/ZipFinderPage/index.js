/**
 *
 * ZipFinderPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ZipFinderWrapper from 'components/intro/ZipFinderWrapper';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectZipFinderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import districtActions from './actions';

export function ZipFinderPage({
  loadZipCallback,
  currentLocationCallback,
  districtState,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  const { geoError } = districtState;

  const childProps = {
    loadZipCallback,
    currentLocationCallback,
    geoError,
  };

  return (
    <div>
      <Helmet>
        <title>ZipFinderPage</title>
        <meta name="description" content="Description of ZipFinderPage" />
      </Helmet>
      <ZipFinderWrapper {...childProps} />
    </div>
  );
}

ZipFinderPage.propTypes = {
  loadZipCallback: PropTypes.func,
  currentLocationCallback: PropTypes.func,
  districtState: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadZipCallback: zip => {
      dispatch(districtActions.loadZipAction(zip, true));
    },
    currentLocationCallback: coords => {
      dispatch(districtActions.geolocationToDistrictAction(coords));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ZipFinderPage);
