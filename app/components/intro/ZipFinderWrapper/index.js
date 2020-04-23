/**
 *
 * ZipFinderWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import { H2, Body, Body11, Body13, Body12 } from 'components/shared/typogrophy';
import NextButton from 'components/shared/buttons/NextButton';
import GrayWrapper from 'components/shared/GrayWrapper';
import Nav from 'containers/shared/Nav';
import GeoLocator from './GeoLocator';

const ContentWrapper = styled.div`
  min-height: 100vh;
  padding: 0 16px 0;
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - 40px);
    padding: 3rem 16px 0;
  }
`;
const StyledH2 = styled(H2)`
  padding: 40px 0 24px;
`;

const LocationWrapper = styled.div`
  margin-top: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Location = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  margin-left: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Form = styled.form`
  margin-top: 20px;
  margin-bottom: 16px;
`;

const StyledInput = styled(Input)`
  && {
    letter-spacing: 40px;
    font-size: 32px;
    .MuiInputBase-input {
      letter-spacing: 40px;
      font-size: 32px;
    }
  }
`;

const Next = styled(Body12)`
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 500;

  &.active {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

function ZipFinderWrapper({
  loadZipCallback,
  currentLocationCallback,
  geoError,
  user,
}) {
  const [zip, setZip] = useState('');
  const [valid, setValid] = useState(false);
  const [findGeoLocation, setFindGeoLocation] = useState(false);

  const onChangeText = event => {
    const text = event.target.value;
    if (text.length < 5) {
      setZip(event.target.value);
    }
    if (text.length === 5) {
      setZip(event.target.value);
      setValid(true);
    }
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleNextStep();
  };

  const handleNextStep = () => {
    if (valid) {
      loadZipCallback(zip, user);
    }
  };
  const getLocation = () => {
    setFindGeoLocation(true);
  };
  return (
    <GrayWrapper>
      <Nav hideMobileNav={user ? false : true} />
      <ContentWrapper>
        <StyledH2>
          Enter your zip to see elections where your vote can do Good!
        </StyledH2>
        <Body className="bold600">Enter Home Zip Code</Body>
        <Form noValidate onSubmit={handleSubmitForm}>
          <StyledInput
            value={zip}
            onChange={onChangeText}
            maxLength={5}
            autoFocus
            inputProps={{ autoFocus: true }}
            type="tel"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;"
          />
        </Form>
        <Body11>
          We only use this information to find your voting district
        </Body11>
        <LocationWrapper onClick={getLocation}>
          <img
            src="https://assets.thegoodparty.org/icons/location-user.svg"
            alt="location"
          />
          <Location>I’m Home, Use my Current Location</Location>
        </LocationWrapper>
        {findGeoLocation && (
          <GeoLocator
            currentLocationCallback={currentLocationCallback}
            geoError={geoError}
          />
        )}
        <ButtonWrapper onClick={handleNextStep}>
          <NextButton active={valid}>
            <Next className={valid ? 'active' : ''}>GO</Next>
          </NextButton>
        </ButtonWrapper>
      </ContentWrapper>
    </GrayWrapper>
  );
}

ZipFinderWrapper.propTypes = {
  loadZipCallback: PropTypes.func,
  currentLocationCallback: PropTypes.func,
  geoError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ZipFinderWrapper;
