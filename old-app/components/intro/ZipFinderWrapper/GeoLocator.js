/**
 *
 * GeoLocator
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { geolocated } from 'react-geolocated';
import CircularProgress from '@material-ui/core/CircularProgress';

const Wrapper = styled.div`
  padding: 16px 0;
`;
const Error = styled.div`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;
`;

function GeoLocator({
  currentLocationCallback,
  coords,
  geoError,
  isGeolocationEnabled,
  isGeolocationAvailable,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (coords) {
      currentLocationCallback(coords);
      setLoading(false);
    }
  }, [coords]);
  useEffect(() => {
    if (!isGeolocationEnabled || !isGeolocationAvailable) {
      setLoading(false);
    }
  }, [isGeolocationEnabled, isGeolocationAvailable]);

  return (
    <Wrapper>
      {loading ? (
        <CircularProgress />
      ) : (
        <Error>
          {geoError &&
            'Error occurred while using your Geo Location. Please enter your zip code above.'}
          {isGeolocationEnabled && 'Your Geo Location is not enabled.'}
          {isGeolocationAvailable && 'Your Geo Location is not available.'}
        </Error>
      )}
    </Wrapper>
  );
}

GeoLocator.propTypes = {
  currentLocationCallback: PropTypes.func,
  coords: PropTypes.object,
  geoError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isGeolocationEnabled: PropTypes.bool,
  isGeolocationAvailable: PropTypes.bool,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
})(GeoLocator);
