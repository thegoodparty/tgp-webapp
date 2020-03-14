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

function GeoLocator({ currentLocationCallback, coords }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (coords) {
      currentLocationCallback(coords);
      setLoading(false);
    }
  });

  return (
    <Wrapper>{loading ? <CircularProgress /> : <div>Found you!</div>}</Wrapper>
  );
}

GeoLocator.propTypes = {
  currentLocationCallback: PropTypes.func,
  coords: PropTypes.object,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
})(GeoLocator);
