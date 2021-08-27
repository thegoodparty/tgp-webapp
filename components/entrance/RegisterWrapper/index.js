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
import { OutlinedButton, PurpleButton } from 'components/shared/buttons';
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
  background-color: ${({ theme }) => theme.colors.purple3};
`;

const PhoneWrapper = styled.div`
  margin-bottom: 24px;
  .phone-input {
    width: 100%;
    height: 60px;
    line-height: 22px;
    font-size: 16px;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      font-size: 20px;
      line-height: 26px;
      ::placeholder {
        font-size: 16px;
      }
    }
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
    zipcode: '',
    isSubmitted: false,
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
    return validZip.test(formData.zipcode);
  };

  const validatePhone = () => formData.phone.length === 10;

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      registerCallback(
        formData.email,
        formData.phone,
        formData.password,
        formData.zipcode,
      );
      setFormData({
        ...formData,
        isSubmitted: true,
      });
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
    { label: 'Zip Code', key: 'zipcode', type: 'text', required: true },
  ];

  return (
    <PageWrapper purple>
      <Wrapper>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <Heart src={heartImg} />
          <H1 data-cy="title">Join Good Party</H1>
        </div>

        <form noValidate onSubmit={handleSubmitForm} data-cy="email-form">
          {fields.map(field => (
            <>
              {field.type === 'tel' ? (
                <PhoneWrapper>
                  <PhoneInput
                    country="us"
                    disableCountryCode
                    disableDropdown
                    inputClass="phone-input"
                    placeholder="Phone Number"
                    onlyCountries={['us']}
                    value={formData.phone}
                    onChange={phone =>
                      onChangeField({ target: { value: phone } }, 'phone')
                    }
                  />
                  <Body11 style={{ marginTop: '8px' }}>
                    Either email or phone number are required
                  </Body11>
                </PhoneWrapper>
              ) : (
                <Input
                  value={formData[field.key]}
                  label={field.label}
                  required={field.required}
                  size="medium"
                  fullWidth
                  type={field.type}
                  name={field.key}
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
            <PurpleButton
              fullWidth
              disabled={!enableSubmit()}
              onClick={handleSubmit}
              type="submit"
            >
              JOIN
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
      </Wrapper>
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
