/**
 *
 * SetZipWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import PageWrapper from '/components/shared/PageWrapper';
import { Body, Body13, H1 } from '/components/shared/typogrophy';
import BlackButton from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  padding: 24px 0;
  max-width: 600px;
  margin: 24px auto;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      background-color: #fff;
      border-radius: 4px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const Skip = styled(Body13)`
  text-align: right;
  color: ${({ theme }) => theme.colors.gray7};
  cursor: pointer;
  margin-top: 16px;
  text-decoration: underline;
`;

function SetZipWrapper({ setZipCallback }) {
  const [zip, setZip] = useState('');

  const enableSubmit = () => {
    const onlyDigitsRegex = /^\d+$/;
    const onlyDigits = onlyDigitsRegex.test(zip);
    return zip.length === 5 && onlyDigits;
  };

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const onChangeZip = zipcode => {
    setZip(zipcode);
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      setZipCallback(zip);
    }
  };
  return (
    <PageWrapper>
      <Wrapper>
        <H1 data-cy="title">Set a zip code for your account</H1>
        <Body style={{ marginTop: '24px' }}>
          Please add a zip code so we can match you to candidates in your area.
        </Body>
        <form noValidate onSubmit={handleSubmitForm}>
          <div style={{ marginTop: '54px', marginBottom: '22px' }}>
            <Input
              value={zip}
              label="Zip Code"
              required
              size="medium"
              fullWidth
              name="zipcode"
              type="tel"
              variant="outlined"
              onChange={e => onChangeZip(e.target.value)}
              helperText="5 digits zip code"
            />
          </div>
          <BlackButton
            fullWidth
            disabled={!enableSubmit()}
            onClick={handleSubmit}
            type="submit"
          >
            SAVE ZIP CODE
          </BlackButton>
          <br />
          <Skip onClick={() => setZipCallback(zip, true)}>Not Now</Skip>
        </form>
      </Wrapper>
    </PageWrapper>
  );
}

SetZipWrapper.propTypes = {
  setZipCallback: PropTypes.func,
};

export default SetZipWrapper;
