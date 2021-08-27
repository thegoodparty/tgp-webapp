/**
 *
 * SocialRegisterWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';

import globals from 'globals';
import QueryModalContainer from 'containers/shared/QueryModalContainer';
import { logEvent } from 'services/AnalyticsService';

import SocialButton from './SocialButton';

import { H1, H2, Body13, Body11, Body, Body9 } from '../../shared/typogrophy';
import { OutlinedButton, PurpleButton } from '../../shared/buttons';
import TwitterButton from '../../shared/TwitterButton';

const StyledH1 = styled(H1)`
  margin: 18px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    margin: 24px 0;
  }
`;
const OrWrapper = styled.div`
  margin-top: 24px;
  height: 16px;
  position: relative;
`;

const Border = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
  height: 13px;
`;

const Or = styled.div`
  position: absolute;
  width: 160px;
  text-align: center;
  left: calc(50% - 80px);
  top: 4px;
  background-color: ${({ theme }) => theme.colors.purple3};
  font-size: 9px;
`;

const Tap = styled.div`
  margin: 18px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray7};
`;

const ButtonText = styled(Body)`
  color: #fff;
  font-weight: 500;
  &.disabled {
    color: #e0d4ea;
  }
`;

const Error = styled(Body11)`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 500;
  margin-bottom: 18px;
  margin-left: 16px;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 12px;

    .MuiInputBase-root {
      border-radius: 8px;
    }

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0px 2px 0px rgba(17, 17, 31, 0.25);

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

function SocialRegisterWrapper({
  socialLoginCallback,
  socialLoginFailureCallback,
  twitterButtonCallback,
  emailRegisterCallback,
}) {
  const router = useRouter();
  let title = <>Join the Good Party</>;
  if (router.route === '/candidate/[...NameIdTab]') {
    title = <>Complete endorsement</>;
  }
  const initState = {
    name: '',
    email: '',
  };
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const onChangeField = (event, key) => {
    setState({
      ...state,
      [key]: event.target.value,
    });
  };

  const trackEmail = () => {
    logEvent(
      'Signup',
      'Click Signup Method',
      `Click Email Signup`,
    );
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    const isValid = validEmail.test(state.email);

    return isValid;
  };

  const handleSubmitForm = e => {
    e.preventDefault();
  };
  const enableSubmit = () => {
    return state.name !== '' && validateEmail();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      trackEmail();
      emailRegisterCallback(state.name, state.email);
    } else if (state.name === '' && !validateEmail()) {
      setErrors({ email: true, name: true });
    } else if (state.name === '') {
      setErrors({ email: false, name: true });
    } else {
      setErrors({ email: true, name: false });
    }
  };

  return (
    <QueryModalContainer>
      <Body13 data-cy="login-wrapper">
        Have a profile?{' '}
        <Link href="/login" data-cy="login">
          Sign In
        </Link>
      </Body13>
      <StyledH1 data-cy="title">{title}</StyledH1>

      <form noValidate onSubmit={handleSubmitForm}>
        <Input
          label="Full name"
          required
          size="medium"
          name="name"
          variant="outlined"
          fullWidth
          data-cy="full-name"
          onChange={e => onChangeField(e, 'name')}
          error={errors.name}
        />
        {errors.name && <Error>Please enter your name</Error>}
        <Input
          label="Email address"
          required
          size="medium"
          name="email"
          variant="outlined"
          fullWidth
          data-cy="email"
          onChange={e => onChangeField(e, 'email')}
          error={errors.email}
          type="email"
        />
        {errors.email && <Error>Please enter a valid email address</Error>}
        <PurpleButton
          fullWidth
          onClick={handleSubmit}
          type="submit"
          disabled={!enableSubmit()}
        >
          <ButtonText className={!enableSubmit() && 'disabled'}>
            CONTINUE
          </ButtonText>
        </PurpleButton>
      </form>
      <OrWrapper>
        <Border />
        <Or>
          <Body9 style={{ color: '#767676' }}>USE YOUR SOCIAL</Body9>
        </Or>
      </OrWrapper>
      <Tap />
      <Grid container spacing={2}>
        <Grid item xs>
          <div data-cy="facebook-login">
            <SocialButton
              channel="facebook"
              provider="facebook"
              appId={globals.facebookAppId}
              onLoginSuccess={socialLoginCallback}
              onLoginFailure={socialLoginFailureCallback}
            >
              FACEBOOK
            </SocialButton>
          </div>
        </Grid>
        <Grid item xs>
          <TwitterButton clickCallback={twitterButtonCallback}>
            Twitter
          </TwitterButton>
        </Grid>
        <Grid item xs>
          <div data-cy="google-login">
            <SocialButton
              channel="google"
              provider="google"
              appId={globals.googleAppId}
              onLoginSuccess={socialLoginCallback}
              onLoginFailure={socialLoginFailureCallback}
            >
              GOOGLE
            </SocialButton>
          </div>
        </Grid>
      </Grid>
      <div className="text-center">
        <Body11 style={{ margin: '24px 0' }} data-cy="policy-wrapper">
          By signing up, you agree to the{' '}
          <a href="/privacy" target="_blank" data-cy="policy">
            Terms of Service.
          </a>
        </Body11>
      </div>
    </QueryModalContainer>
  );
}

SocialRegisterWrapper.propTypes = {
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  emailRegisterCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

export default SocialRegisterWrapper;
