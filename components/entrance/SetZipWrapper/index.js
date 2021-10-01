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

import PageWrapper from 'components/shared/PageWrapper';
import { H1 } from 'components/shared/typogrophy';
import { PurpleButton } from 'components/shared/buttons';

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: calc(100vh - 100px);
  }
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <H1 data-cy="title">Set a zip code for your account</H1>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
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
              <PurpleButton
                fullWidth
                disabled={!enableSubmit()}
                onClick={handleSubmit}
                type="submit"
              >
                SAVE ZIP CODE
              </PurpleButton>
            </form>
          </VerticalWrapper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}

SetZipWrapper.propTypes = {
  setZipCallback: PropTypes.func,
};

export default SetZipWrapper;
