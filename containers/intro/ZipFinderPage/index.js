/**
 *
 * ZipFinderPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-next-router';

import ZipFinderWrapper from 'components/intro/ZipFinderWrapper';
import AnalyticsService from 'services/AnalyticsService';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectZipFinderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import districtActions from './actions';
import makeSelectUser from '../../you/YouPage/selectors';
import userActions from '../../you/YouPage/actions';

export function ZipFinderPage({
  loadZipCallback,
  currentLocationCallback,
  districtState,
  userState,
  cardDisplay,
}) {
  useInjectReducer({ key: 'zipFinderPage', reducer });
  useInjectSaga({ key: 'zipFinderPage', saga });

  const { geoError } = districtState;
  const { user } = userState;

  const childProps = {
    loadZipCallback,
    currentLocationCallback,
    geoError,
    user,
    cardDisplay,
  };

  return (
    <div>
      {!cardDisplay && (
        <Head>
          <title>Zip Finder</title>
          <meta name="description" content="Zip Finder" />
        </Head>
      )}
      <ZipFinderWrapper {...childProps} />
    </div>
  );
}

ZipFinderPage.propTypes = {
  loadZipCallback: PropTypes.func,
  currentLocationCallback: PropTypes.func,
  districtState: PropTypes.object,
  userState: PropTypes.object,
  cardDisplay: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  districtState: makeSelectZipFinderPage(),
  userState: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadZipCallback: (zip, user) => {
      if (user) {
        dispatch(userActions.updateUserAction({ zip }));
      }

      dispatch(push(`/elections/district/${zip}`));
      AnalyticsService.sendEvent('Location', 'Submit ZIP Location');
    },
    currentLocationCallback: coords => {
      dispatch(districtActions.geolocationToDistrictAction(coords));
      AnalyticsService.sendEvent('Location', 'Submit Device Location');
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ZipFinderPage);
