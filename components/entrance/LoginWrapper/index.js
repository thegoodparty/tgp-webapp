import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';
import PageWrapper from '/components/shared/PageWrapper';
import { Body13, H1 } from '/components/shared/typogrophy';
import globals from '../../../globals';
import { PurpleButton } from '../../shared/buttons';
import TwitterButton from '../../shared/TwitterButton';
import PhoneOrEmailInput from '../../shared/PhoneOrEmailInput';
const SocialButton = dynamic(
  () => import('/components/you/SocialRegisterWrapper/SocialButton'),
  { ssr: false },
);

const Wrapper = styled.div`
  padding: 24px 0;
  max-width: 600px;
  margin: 0 auto;
`;

const OrWrapper = styled.div`
  margin-top: 24px;
  height: 16px;
  position: relative;
`;

const Border = styled.div`
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
  height: 10px;
`;

const Or = styled.div`
  position: absolute;
  width: 50px;
  text-align: center;
  left: calc(50% - 25px);
  top: 0;
  background: #fff;
`;

const GoogleBtnWrapper = styled.div`
  margin-top: 24px;
`;

const LoginWrapper = ({
  loginCallback,
  socialLoginCallback,
  socialLoginFailureCallback,
  twitterButtonCallback,
}) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [valueType, setValueType] = useState(false);

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (isValid) {
      loginCallback(value, valueType);
    }
  };

  const onChangeValue = (val, isValValid, valType) => {
    setIsValid(isValValid);
    setValue(val);
    setValueType(valType);
  };

  return (
    <PageWrapper>
      <Wrapper>
        <H1 data-cy="title" style={{ marginBottom: '24px' }}>
          Log into your account
        </H1>
        <Body13 style={{ margin: '48px 0' }} data-cy="register-label">
          Don&apos;t have an account?{' '}
          <Link href="/register" data-cy="register">
            Create one
          </Link>
        </Body13>
        <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
          <PhoneOrEmailInput onChangeCallback={onChangeValue} />
          <div data-cy="login">
            <PurpleButton
              fullWidth
              disabled={!isValid}
              onClick={handleSubmit}
              type="submit"
            >
              NEXT
            </PurpleButton>
          </div>
        </form>
        <OrWrapper>
          <Border />
          <Or>
            <Body13 style={{ color: '#767676' }}>Or</Body13>
          </Or>
        </OrWrapper>
        <br />
        <div data-cy="facebook-login">
          <SocialButton
            channel="facebook"
            provider="facebook"
            appId={globals.facebookAppId}
            onLoginSuccess={socialLoginCallback}
            onLoginFailure={socialLoginFailureCallback}
          >
            Continue with FACEBOOK
          </SocialButton>
        </div>
        <br />
        <TwitterButton clickCallback={twitterButtonCallback}>
          Continue with Twitter
        </TwitterButton>
        <br />
        <GoogleBtnWrapper data-cy="google-login">
          <SocialButton
            channel="google"
            provider="google"
            appId={globals.googleAppId}
            onLoginSuccess={socialLoginCallback}
            onLoginFailure={socialLoginFailureCallback}
          >
            Continue with GOOGLE
          </SocialButton>
        </GoogleBtnWrapper>
      </Wrapper>
    </PageWrapper>
  );
};

LoginWrapper.propTypes = {
  loginCallback: PropTypes.func,
  socialLoginCallback: PropTypes.func,
  socialLoginFailureCallback: PropTypes.func,
  forgotPasswordCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

export default LoginWrapper;
