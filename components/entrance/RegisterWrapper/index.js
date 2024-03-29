import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

import PageWrapper from '/components/shared/PageWrapper';
import { Body13, H1, Body11 } from '/components/shared/typogrophy/index';
import globals from '/globals';
import TwitterButton from '/components/shared/TwitterButton';
import BlackButton from '../../shared/buttons/BlackButton';
import H2 from '../../shared/typogrophy/H2';

const SocialButton = dynamic(
  () => import('/components/you/SocialRegisterWrapper/SocialButton'),
  { ssr: false },
);

const Wrapper = styled.div`
  padding: 24px 0;
  max-width: 600px;
  margin: 0 auto;
  &.with-padding {
    padding: 8px 24px 24px;
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
  background-color: #fff;
`;

const Input = styled(TextField)`
  && {
    margin-bottom: 18px;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      background-color: #F7F7FE;
      border-radius: 4px;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

export const REGISTER_FIELDS = [
  {
    label: 'Full Name',
    key: 'name',
    type: 'text',
    required: true,
    isUpdatable: false,
    helperText: '100 characters maximum',
  },
  {
    label: 'Email Address',
    key: 'email',
    type: 'email',
    required: true,
    isUpdatable: false,
  },

  {
    label: 'Zip Code',
    key: 'zipcode',
    type: 'text',
    required: true,
    isUpdatable: true,
  },
];

const RegisterWrapper = ({
  user,
  registerCallback,
  socialRegisterCallback,
  socialRegisterFailureCallback,
  twitterButtonCallback,
  isUpdate = false,
  queryEmail,
  modalMode,
  verifyRecaptchaCallback,
  score,
  experimentVariant,
}) => {
  useEffect(() => {
    if (queryEmail) {
      setFormData({
        ...formData,
        email: queryEmail,
      });
    }
  }, [queryEmail]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || queryEmail || '',
    zipcode: user?.zip || '',
  });
  const router = useRouter();
  const pathWithNoQuery = router.asPath.split('?')[0];

  const enableSubmit = () => {
    return (
      formData.name.length >= 2 &&
      formData.name.length <= 100 &&
      validateZip() &&
      validateEmail()
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (enableSubmit()) {
      registerCallback(formData.name, formData.email, formData.zipcode);
    }
  };

  const onChangeField = (event, key) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  const handleVerify = (token) => {
    if (token) {
      verifyRecaptchaCallback(token);
    }
  };
  if (score === 'bad') {
    return (
      <PageWrapper hideFooter={modalMode} hideNav={modalMode}>
        <Wrapper className={modalMode && 'with-padding'}>
          <div
            className="text-center"
            style={{ marginBottom: '32px', paddingTop: '32px' }}
          >
            <H1 data-cy="register-title">Sign up for Good Party</H1>

            <br />
            <br />
            <div>Sorry, we can't create an account for you at the moment.</div>
          </div>
        </Wrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper hideFooter={modalMode} hideNav={modalMode}>
      <Wrapper className={modalMode && 'with-padding'}>
        <div className="text-center" style={{ marginBottom: '24px' }}>
          <Image
            src="/images/black-logo.svg"
            data-cy="logo"
            width={174}
            height={20}
            alt="GOOD PARTY"
          />
        </div>
        <div
          className="text-center"
          style={{ marginBottom: '32px', paddingTop: '32px' }}
        >
          <H1 data-cy="register-title">Sign up for Good Party</H1>
        </div>
        <Body13 style={{ margin: '24px 0' }} data-cy="register-label">
          Already have an account?{' '}
          <Link href={`${pathWithNoQuery}?login=true`}>
            <a data-cy="redirect-to-login">login</a>
          </Link>
        </Body13>
        <form
          noValidate
          onSubmit={handleSubmitForm}
          data-cy="email-form"
          id="register-page-form"
        >
          {REGISTER_FIELDS.map((field) => (
            <div data-cy="register-field" key={field.key}>
              <Input
                value={formData[field.key]}
                label={field.label}
                required={field.required}
                size="medium"
                fullWidth
                type={field.type}
                name={field.key}
                variant="outlined"
                disabled={isUpdate && !field.isUpdatable}
                onChange={(e) => onChangeField(e, field.key)}
                helperText={field.helperText}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          ))}

          <div>
            <BlackButton
              fullWidth
              disabled={!enableSubmit()}
              onClick={handleSubmit}
              type="submit"
            >
              {user ? 'UPDATE' : 'Sign Up'}
            </BlackButton>
          </div>
          {!score && (
            <GoogleReCaptcha onVerify={handleVerify} action="REGISTER" />
          )}
        </form>
        {experimentVariant === '0' && (
          <>
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
            <div data-cy="twitter-login">
              <TwitterButton clickCallback={twitterButtonCallback}>
                Continue with Twitter
              </TwitterButton>
            </div>
            <br />
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
          </>
        )}
      </Wrapper>
    </PageWrapper>
  );
};

RegisterWrapper.propTypes = {
  registerCallback: PropTypes.func,
  socialRegisterCallback: PropTypes.func,
  socialRegisterFailureCallback: PropTypes.func,
  twitterButtonCallback: PropTypes.func,
  user: PropTypes.object,
  isUpdate: PropTypes.bool,
};

export default RegisterWrapper;
