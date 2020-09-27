/**
 *
 * VerifyVoteWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import LogoCaps from 'images/logo-caps.svg';
import { H1, Body } from 'components/shared/typogrophy';
import { states } from 'helpers/statesHelper';
import { NextButton } from '../../shared/buttons';

const LeftWrapper = styled.div`
  background: radial-gradient(#ffffff, ${props => props.theme.colors.grayF});
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 16px;
`;

const StyledBody = styled(Body)`
  margin-top: 8px;
  color: ${props => props.theme.colors.gray7};
`;

const RightWrapper = styled.div`
  min-height: 100vh;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5% 10%;
  }
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 20px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    padding: 10px;
  }
`;

const Skip = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 24px;
  color: ${props => props.theme.colors.blue};
  background-color: #fff;
  cursor: pointer;
`;

const NextButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 24px;
  background-color: #fff;
  cursor: pointer;
`;

const VerifyVoteWrapper = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    address: '',
    city: '',
    state: 'None',
    zip: '',
    phone: '',
    dob: '',
    email: '',
  });
  const [error, setError] = useState(false);
  const [submitActive, setSubmitActive] = useState(false);

  const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zip'];

  const onChange = (event, key) => {
    setState({
      ...state,
      [key]: event.target.value,
    });
    if (error) {
      setError(false);
    }
  };
  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const submitForm = () => {
    if (canSubmit()) {
      alert('submit');
    }
  };

  const canSubmit = () => {
    for (let i = 0; i < required.length; i++) {
      const requiredField = required[i];
      if (state[requiredField] === '') {
        // setError(requiredField);
        return false;
      }
    }
    if (state.state === 'None') {
      // setError('state');
      return false;
    }
    return true;
  };

  const message = (
    <>
      <H1>Check Your Voter Registration</H1>
      <StyledBody className="text-center">
        In order to check your voter registration with the state database we
        need some information to confirm your identity
      </StyledBody>
    </>
  );
  return (
    <Grid container spacing={0}>
      <Hidden smDown>
        <Grid item xs={false} md={5}>
          <LeftWrapper>
            <Logo src={LogoCaps} alt="logo" />
            {message}
          </LeftWrapper>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={7}>
        <RightWrapper>
          <form noValidate onSubmit={handleSubmitForm}>
            <Skip>Skip</Skip>
            <Hidden mdUp>{message}</Hidden>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.firstName}
                  label="First Name"
                  name="First Name"
                  required
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'firstName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.lastName}
                  label="Last Name"
                  name="Last Name"
                  required
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'lastName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.middleName}
                  label="Middle Name"
                  name="Middle Name"
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'middleName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.suffix}
                  label="Suffix"
                  name="Suffix"
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'suffix')}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  value={state.address}
                  label="Street Address"
                  name="Address"
                  size="medium"
                  required
                  fullWidth
                  onChange={e => onChange(e, 'address')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.city}
                  label="City"
                  name="City"
                  size="medium"
                  required
                  fullWidth
                  onChange={e => onChange(e, 'city')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <StyledSelect
                      value={state.state}
                      label="State"
                      name="State"
                      size="medium"
                      required
                      onChange={e => onChange(e, 'state')}
                    >
                      <MenuItem value="None">Select A State</MenuItem>
                      {states.map(stateItem => (
                        <MenuItem
                          value={stateItem.abbreviation}
                          key={stateItem.abbreviation}
                        >
                          {stateItem.name}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      value={state.zip}
                      label="Zip"
                      name="Zip"
                      size="medium"
                      required
                      onChange={e => onChange(e, 'zip')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.phone}
                  label="Phone Number"
                  name="Phone Number"
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'phone')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Input
                  value={state.dob}
                  label="Date of Birth (YYYY-DD-MM)"
                  name="Date of Birth"
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'dob')}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  value={state.email}
                  label="Email"
                  name="Email"
                  size="medium"
                  fullWidth
                  onChange={e => onChange(e, 'email')}
                />
              </Grid>
            </Grid>
            <NextButtonWrapper>
              <NextButton active={canSubmit()} onClick={submitForm}>
                Submit
              </NextButton>
            </NextButtonWrapper>
          </form>
        </RightWrapper>
      </Grid>
    </Grid>
  );
};

VerifyVoteWrapper.propTypes = {
  voteMode: PropTypes.string,
};

export default VerifyVoteWrapper;
