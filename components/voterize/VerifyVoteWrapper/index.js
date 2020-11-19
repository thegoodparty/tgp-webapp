/**
 *
 * VerifyVoteWrapper
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

import { validateEmail } from 'helpers/emailHelper';
import { parseDob, parseDobUS } from 'helpers/dateHelper';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import LogoCaps from 'public/images/logo-caps.svg';
import { H1, H2, H3, Body } from 'components/shared/typogrophy';
import { states } from 'helpers/statesHelper';
import {
  NextButton,
  OutlinedButton,
  BlueButton,
} from 'components/shared/buttons';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import {
  DobFormat,
  PhoneNumberFormat,
} from 'components/shared/customInputFormat';
import AnalyticsService from 'services/AnalyticsService';
import { formatToPhone } from '../../../helpers/phoneHelper';
import { deleteCookie } from '../../../helpers/cookieHelper';

const LeftWrapper = styled.div`
  background: radial-gradient(#ffffff, ${props => props.theme.colors.grayF});
  min-height: 100vh;
  height: 100%;
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
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 5% 20%;
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
  padding: 18px 12px;
  color: ${props => props.theme.colors.blue};
  background-color: #fff;
  cursor: pointer;
  z-index: 2010;
`;

const NextButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 24px;
  cursor: pointer;
`;

const WarningWrapper = styled.div`
  padding: 1rem 2rem;
  border: 1px solid ${props => props.theme.colors.orange};
  border-radius: 8px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
`;

const VerifyVoteWrapper = ({
  verifyVoterCallback,
  skipVerifyVoterCallback,
  registerToVoteCallback,
  vaResponse,
  user,
  voteStatus,
  loading,
}) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    dob: '',
    email: '',
  });
  const [showRegister, setShowRegister] = useState(false);
  const [registerResponse, setRegisterResponse] = useState(false);
  useEffect(() => {
    if (user) {
      const { name, email, phone, shortState, zipCode } = user;
      const splittedName = name.split(' ');
      setState(prevState => ({
        ...prevState,
        firstName: splittedName[0] || '',
        lastName: (splittedName.length === 2 && splittedName[1]) || '',
        email: email || '',
        phone: phone || '',
        state: shortState?.toUpperCase() || '',
        city: zipCode?.primaryCity || '',
        zip: zipCode?.zip || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (voteStatus !== false && voteStatus !== 'Active') {
      setShowRegister(true);
    }
  }, [voteStatus]);

  useEffect(() => {
    if (vaResponse !== false) {
      setRegisterResponse(vaResponse);
    }
  }, [vaResponse]);
  const [error, setError] = useState(false);

  const required = [
    'firstName',
    'lastName',
    'address',
    'city',
    'state',
    'zip',
    'email',
    'dob',
  ];
  const validateForm = (key, value) => {
    if (required.includes(key)) {
      if (value === '' || (key === 'state' && value === '')) {
        setError({
          ...error,
          [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
        });
      } else {
        setError({ ...error, [key]: null });
      }
    }
    if (key === 'email' && value !== '') {
      if (validateEmail(value)) {
        setError({ ...error, [key]: null });
      } else {
        setError({ ...error, [key]: `Email is invalid.` });
      }
    } else if (key === 'dob') {
      if (value === '' || parseDob(value)) {
        setError({ ...error, [key]: null });
      } else {
        setError({ ...error, [key]: `Date of Birth is invalid.` });
      }
    } else if (key === 'phone') {
      if (value === '' || value.length === 10) {
        setError({ ...error, [key]: null });
      } else {
        setError({ ...error, [key]: `Phone Number is invalid.` });
      }
    }
  };
  const onChange = (event, key) => {
    setState({
      ...state,
      [key]: event.target.value,
    });
    validateForm(key, event.target.value);
  };

  const submitForm = () => {
    if (canSubmit()) {
      verifyVoterCallback(formattedState(), user);
    }
  };

  const registerToVote = () => {
    registerToVoteCallback(formattedState());
  };

  const formattedState = () => {
    const { phone, dob } = state;
    const voterFormState = {
      ...state,
      phone: `${phone.substr(0, 3)}-${phone.substr(3, 3)}-${phone.substr(
        6,
        4,
      )}`,
      dob: parseDob(dob),
    };
    return voterFormState;
  };

  const canSubmit = () => {
    let isValid = true;
    const currentError = { ...error };
    for (let i = 0; i < required.length; i++) {
      const requiredField = required[i];
      if (state[requiredField] === '') {
        isValid = false;
        let displayKey;
        if (requiredField === 'firstName') {
          displayKey = 'First name';
        } else if (requiredField === 'lastName') {
          displayKey = 'Last name';
        } else {
          displayKey =
            requiredField.charAt(0).toUpperCase() + requiredField.slice(1);
        }
        currentError[requiredField] = `${displayKey} is required.`;
      }
    }
    if (state.state === '') {
      currentError.state = 'State is required.';
      isValid = false;
    }
    Object.keys(error).forEach(key => {
      if (error[key]) {
        isValid = false;
      }
    });
    setError(currentError);
    return isValid;
  };
  const message = () => {
    if (registerResponse) {
      return <H2>Register To Vote</H2>;
    }
    if (showRegister) {
      return (
        <WarningWrapper>
          <H2>Looks like you aren&apos;t registered right now</H2>
        </WarningWrapper>
      );
    }
    return (
      <>
        <H1>Check Your Voter Registration</H1>
        <StyledBody className="text-center">
          In order to check your voter registration with the state database we
          need some information to confirm your identity
        </StyledBody>
      </>
    );
  };

  const capitalizeSentence = text =>
    text.charAt(0).toUpperCase() + text.slice(1);
  const showData = { name: `${state.firstName} ${state.lastName}`, ...state };
  const showDataKeys = Object.keys(showData).filter(
    item => !item.includes('Name'),
  );

  const trackClose = () => {
    AnalyticsService.sendEvent('Voter Registration', 'Close Voterize Form');
    deleteCookie('signupRedirect');
  };

  return (
    <Dialog fullScreen aria-labelledby="Verify Voter Registration" open>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid item xs={false} md={5}>
            <LeftWrapper>
              <Logo src={LogoCaps} alt="logo" />
              {message()}
            </LeftWrapper>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={7}>
          <RightWrapper>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <>
                <Link href="you" onClick={trackClose}>
                  <Skip>Close</Skip>
                </Link>
                <Hidden mdUp>
                  <WarningWrapper>{message()}</WarningWrapper>
                </Hidden>
                {registerResponse ? (
                  <div>
                    {registerResponse.message_markdown && (
                      <Markdown>
                        {registerResponse.message_markdown.replace(
                          '&#39;',
                          "'",
                        )}
                      </Markdown>
                    )}
                    <br />
                    <br />
                    {registerResponse.buttons && (
                      <Grid container spacing={3}>
                        {registerResponse.buttons.map(button => (
                          <Grid item xs={6} key={button.url}>
                            <a href={button.url} target="_blank">
                              {button.primary ? (
                                <BlueButton
                                  fullWidth
                                  onClick={skipVerifyVoterCallback}
                                >
                                  {button.message_text}
                                </BlueButton>
                              ) : (
                                <OutlinedButton
                                  fullWidth
                                  active
                                  onClick={skipVerifyVoterCallback}
                                >
                                  {button.message_text}
                                </OutlinedButton>
                              )}
                            </a>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </div>
                ) : (
                  <>
                    {showRegister ? (
                      <div>
                        <H3 style={{ textAlign: 'center' }}>
                          Edit your info to try again, or Register to Vote
                        </H3>
                        <br />
                        <br />
                        <Grid container spacing={3}>
                          {showDataKeys.map(key => (
                            <React.Fragment key={key}>
                              {showData[key] !== '' && (
                                <>
                                  <Grid
                                    item
                                    xs={4}
                                    style={{ textAlign: 'right' }}
                                  >
                                    <StyledBody>
                                      {capitalizeSentence(key)}
                                    </StyledBody>
                                  </Grid>
                                  <Grid item xs={1} />
                                  <Grid item xs={7}>
                                    {key === 'phone' ? (
                                      <StyledBody>
                                        {formatToPhone(showData[key])}
                                      </StyledBody>
                                    ) : (
                                      <>
                                        {key === 'dob' ? (
                                          <StyledBody>
                                            {parseDobUS(showData[key])}
                                          </StyledBody>
                                        ) : (
                                          <StyledBody>
                                            {showData[key]}
                                          </StyledBody>
                                        )}
                                      </>
                                    )}
                                  </Grid>
                                </>
                              )}
                            </React.Fragment>
                          ))}
                          <br />
                          <br />
                          <Grid item xs={6}>
                            <OutlinedButton
                              fullWidth
                              active
                              onClick={() => setShowRegister(false)}
                            >
                              EDIT INFO
                            </OutlinedButton>
                          </Grid>
                          <Grid item xs={6}>
                            <BlueButton fullWidth onClick={registerToVote}>
                              REGISTER TO VOTE
                            </BlueButton>
                          </Grid>
                          <Grid item xs={12}>
                            <StyledBody>
                              Powered by VoteAmerica. By hitting register to
                              vote, you agree to VoteAmerica’s{' '}
                              <a
                                href="https://www.voteamerica.com/terms/sms/"
                                target="_blank"
                              >
                                Terms
                              </a>{' '}
                              and{' '}
                              <a
                                href="https://www.voteamerica.com/privacy/"
                                target="_blank"
                              >
                                Privacy
                              </a>
                              . You will receive occasional emails from
                              VoteAmerica. You can unsubscribe at any time. If
                              you provide your cell phone number, you agree to
                              receive occasional text messages from VoteAmerica.
                              Message and data rates may apply. Message
                              frequency varies. Text STOP to cancel and HELP for
                              more info.
                            </StyledBody>
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                      <>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Input
                              error={error.firstName}
                              helperText={error.firstName}
                              value={state.firstName}
                              label="First Name"
                              name="First Name"
                              required
                              size="medium"
                              fullWidth
                              onChange={e => onChange(e, 'firstName')}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Input
                              value={state.lastName}
                              label="Last Name"
                              name="Last Name"
                              required
                              error={error.lastName}
                              helperText={error.lastName}
                              size="medium"
                              fullWidth
                              onChange={e => onChange(e, 'lastName')}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Input
                              value={state.middleName}
                              label="Middle Name"
                              name="Middle Name"
                              size="medium"
                              fullWidth
                              onChange={e => onChange(e, 'middleName')}
                            />
                          </Grid>
                          <Grid item xs={12}>
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
                              error={error.address}
                              helperText={error.address}
                              fullWidth
                              onChange={e => onChange(e, 'address')}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Input
                              value={state.city}
                              label="City"
                              name="City"
                              size="medium"
                              required
                              fullWidth
                              error={error.city}
                              helperText={error.city}
                              onChange={e => onChange(e, 'city')}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl
                              error={error.state}
                              style={{ width: '100%' }}
                            >
                              <StyledSelect
                                native
                                value={state.state}
                                label="State"
                                name="State"
                                size="medium"
                                required
                                onChange={e => onChange(e, 'state')}
                                fullWidth
                              >
                                <option value="">Select A State</option>
                                {states.map(stateItem => (
                                  <option
                                    value={stateItem.abbreviation}
                                    key={stateItem.abbreviation}
                                  >
                                    {stateItem.name}
                                  </option>
                                ))}
                              </StyledSelect>
                              <FormHelperText>{error.state}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Input
                              value={state.zip}
                              label="Zip"
                              name="Zip"
                              size="medium"
                              required
                              error={error.zip}
                              helperText={error.zip}
                              onChange={e => onChange(e, 'zip')}
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Input
                              value={state.phone}
                              label="Phone Number"
                              name="Phone Number"
                              size="medium"
                              error={error.phone}
                              helperText={`${
                                error.phone ? error.phone : ''
                              } Format: (XXX) XXX-XXXX`}
                              fullWidth
                              InputProps={{
                                inputComponent: PhoneNumberFormat,
                                inputMode: 'numeric',
                              }}
                              onChange={e => onChange(e, 'phone')}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Input
                              value={state.dob}
                              label="Date of Birth (MM/DD/YYYY)"
                              name="Date of Birth"
                              size="medium"
                              required
                              fullWidth
                              error={error.dob}
                              helperText={`${
                                error.dob ? error.dob : ''
                              } Format: MM/DD/YYYY`}
                              InputProps={{
                                inputComponent: DobFormat,
                                inputMode: 'numeric',
                              }}
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
                              error={error.email}
                              helperText={error.email}
                              onChange={e => onChange(e, 'email')}
                            />
                          </Grid>
                        </Grid>

                        <NextButtonWrapper>
                          <NextButton active onClick={submitForm}>
                            Submit
                          </NextButton>
                        </NextButtonWrapper>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </RightWrapper>
        </Grid>
      </Grid>
    </Dialog>
  );
};

VerifyVoteWrapper.propTypes = {
  verifyVoterCallback: PropTypes.func,
  skipVerifyVoterCallback: PropTypes.func,
  registerToVoteCallback: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  vaResponse: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  voteStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
};

export default VerifyVoteWrapper;
