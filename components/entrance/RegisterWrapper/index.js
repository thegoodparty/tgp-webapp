import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import PageWrapper from 'components/shared/PageWrapper';
import { Body13, H1, Body11 } from 'components/shared/typogrophy/index';
import globals from 'globals';
import { OutlinedButton } from 'components/shared/buttons';
import PasswordInput from 'components/shared/PasswordInput';
import TwitterButton from 'components/shared/TwitterButton';

const SocialButton = dynamic(
  () => import('components/you/SocialRegisterWrapper/SocialButton'),
  { ssr: false },
);

const heartImg = '/images/heart.svg';
const Heart = styled.img`
  display: block;
  width: 64px;
  height: auto;
  margin: 0 auto 12px;
`;

const ReverseGrid = styled(Grid)`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
  }
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: calc(100vh - 100px);
  }
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
  background: ${({ theme }) => theme.colors.grayBg};
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      background-color: #fff;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const RegisterWrapper = ({
  registerCallback,
  socialRegisterCallback,
  socialRegisterFailureCallback,
  twitterButtonCallback,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    zip: '',
  });

  const enableSubmit = () => {
    return (
      formData.password.length >= 8 &&
      validateZip() &&
      (validatePhone() || validateEmail())
    );
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(formData.email);
  };

  const validateZip = () => {
    const validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return validZip.test(formData.zip);
  };

  const validatePhone = () => formData.phone.length === 10;

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      registerCallback(formData.email, formData.password, formData.zip);
    }
  };

  const onChangeField = (event, key) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  const fields = [
    { label: 'Email Address', key: 'email', type: 'email', required: false },
    {
      type: 'tel',
    },
    { label: 'Zip', key: 'zip', type: 'text', required: true },
  ];

  return (
    <PageWrapper>
      <ReverseGrid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <div className="text-center">
              <Heart src={heartImg} />
              <H1 data-cy="title">Join the Good Party</H1>
            </div>
          </VerticalWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <VerticalWrapper>
            <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
              {fields.map(field => (
                <>
                  {field.type === 'tel' ? (
                    <div>
                      <PhoneInput
                        country="us"
                        disableCountryCode
                        disableDropdown
                        inputStyle={{
                          width: '100%',
                          height: '60px',
                        }}
                        placeholder="Phone Number"
                        onlyCountries={['us']}
                        value={formData.phone}
                        onChange={phone =>
                          onChangeField({ target: { value: phone } }, 'phone')
                        }
                      />
                      <Body11 style={{ margin: '8px 0 24px' }}>
                        Either email or phone number are required
                      </Body11>
                    </div>
                  ) : (
                    <Input
                      value={formData[field.key]}
                      label={field.label}
                      required={field.required}
                      size="medium"
                      fullWidth
                      type={field.type}
                      name={field.key}
                      autoComplete={field.key}
                      variant="outlined"
                      onChange={e => onChangeField(e, field.key)}
                      helperText={field.helperText}
                    />
                  )}
                </>
              ))}

              <PasswordInput
                onChangeCallback={pwd =>
                  onChangeField({ target: { value: pwd } }, 'password')
                }
              />

              <div>
                <OutlinedButton
                  fullWidth
                  active={enableSubmit()}
                  onClick={handleSubmit}
                  type="submit"
                >
                  JOIN
                </OutlinedButton>
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
                onLoginSuccess={socialRegisterCallback}
                onLoginFailure={socialRegisterFailureCallback}
              >
                Continue with FACEBOOK
              </SocialButton>
            </div>
            <br />
            <TwitterButton clickCallback={twitterButtonCallback}>
              Continue with Twitter
            </TwitterButton>
            <br />
            <div data-cy="google-login">
              <SocialButton
                channel="google"
                provider="google"
                appId={globals.googleAppId}
                onLoginSuccess={socialRegisterCallback}
                onLoginFailure={socialRegisterFailureCallback}
              >
                Continue with GOOGLE
              </SocialButton>
            </div>
            <Body13 style={{ margin: '24px 0' }} data-cy="register-label">
              Already have an account? <Link href="/login">login</Link>
            </Body13>
          </VerticalWrapper>
        </Grid>
      </ReverseGrid>
    </PageWrapper>
  );
};

RegisterWrapper.propTypes = {
  registerCallback: PropTypes.func,
  socialRegisterCallback: PropTypes.func,
  socialRegisterFailureCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
};

export default RegisterWrapper;
