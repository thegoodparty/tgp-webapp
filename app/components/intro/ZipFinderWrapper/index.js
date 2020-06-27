/**
 *
 * ZipFinderWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';

import PageWrapper from 'components/shared/PageWrapper';
import { H2, Body, Body11, Body13, Body12 } from 'components/shared/typogrophy';
import NextButton from 'components/shared/buttons/NextButton';
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
  padding: 40px 0 6px;
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
    <PageWrapper hideMobileNav={user ? false : true}>
      <ContentWrapper>
        <StyledH2 data-cy="title">
          Enter your zip code to see your Federal elections
        </StyledH2>
        <Body style={{ marginBottom: '24px' }}>
          See if your vote can be used in voting blocs to elect someone good!
        </Body>
        <Body className="bold600" data-cy="form-label">
          Enter Home Zip Code
        </Body>
        <Form noValidate onSubmit={handleSubmitForm}>
          <StyledInput
            value={zip}
            onChange={onChangeText}
            maxLength={5}
            autoFocus
            inputProps={{ autoFocus: true }}
            type="tel"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;"
            data-cy="zipcode"
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
          <Location data-cy="geo-location-button">
            I’m Home, Use my Current Location
          </Location>
        </LocationWrapper>
        {findGeoLocation && (
          <GeoLocator
            currentLocationCallback={currentLocationCallback}
            geoError={geoError}
          />
        )}
        <ButtonWrapper onClick={handleNextStep} data-cy="submit">
          <NextButton active={valid}>
            <Next className={valid ? 'active' : ''}>SUBMIT</Next>
          </NextButton>
        </ButtonWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

ZipFinderWrapper.propTypes = {
  loadZipCallback: PropTypes.func,
  currentLocationCallback: PropTypes.func,
  geoError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ZipFinderWrapper;
