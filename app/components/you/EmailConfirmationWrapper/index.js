import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { H1, H3 } from 'components/shared/typogrophy/index';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import tgpTheme from 'theme/index';
import OutlinedButton from 'components/shared/buttons/OutlinedButton';
import ExpiredTokenImage from 'images/expired-token.svg';
import EmailErrorImage from 'images/email-error.svg';

const Img = styled.div`
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
`;
const ExpiredImg = styled.div`
  height: 30vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
`;
const ContentWrapper = styled.div`
  color: #fff;
  text-align: center;
  padding: 20px 0;

  &.left {
    text-align: left;
  }
`;
const StyledH1 = styled(H1)`
  color: #fff;
`;
const StyledH3 = styled(H3)`
  color: #fff;
  font-weight: 400;
  margin-top: 16px;
`;

const Input = styled(TextField)`
  && {
    margin-top: 48px;
    color: #fff;

    .MuiInputBase-input {
      line-height: 22px;
      font-size: 16px;
      letter-spacing: 0.1px;
      color: #fff;

      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpoints.md}) {
        font-size: 20px;
        line-height: 26px;
      }
    }

    .MuiFormLabel-root,
    .MuiFormHelperText-root {
      color: #fff;
    }
    .MuiInput-underline:before,
    .MuiInput-underline:after {
      border-color: #fff;
    }
  }
`;

const ButtonsWrapper = styled.div`
  position: fixed;
  bottom: 5rem;
  left: 0;
  width: 100%;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: 2rem;
  }
`;
const ButtonsInnerWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  display: flex;
  flex-direction: row;

  & > div {
    width: calc(50% - 32px);
    margin: 0 16px;
  }
`;
const ButtonsInnerWrapperExpired = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 0 16px;
`;

const wrapperStyles = {
  backgroundColor: tgpTheme.colors.orange,
};

const EmailConfirmationWrapper = ({ loading, error, resendEmailCallback }) => {
  const [email, setEmail] = useState('');
  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const validateEmail = () => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(email);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (validateEmail()) {
      resendEmailCallback(email);
    }
  };

  const handleSubmitExpired = () => {
    resendEmailCallback();
  };
  return (
    <>
      {loading ? (
        <div>
          <Nav />
          <LoadingAnimation label="Verifying your email" />
        </div>
      ) : (
        <div style={wrapperStyles}>
          <Nav />
          {error && error.expired ? (
            <Wrapper style={wrapperStyles}>
              <MobileHeader whiteBackButton />
              <ExpiredImg
                style={{
                  backgroundImage: `url(${ExpiredTokenImage})`,
                }}
              />
              <ContentWrapper>
                <StyledH1 style={{ marginTop: '20px' }}>
                  This link has expired
                </StyledH1>
                <StyledH3>
                  We need to send you a new token and have you confirm within 24
                  hours
                </StyledH3>
                <ButtonsWrapper>
                  <ButtonsInnerWrapperExpired>
                    <div onClick={handleSubmitExpired}>
                      <OutlinedButton label="Resend Email" white fullWidth />
                    </div>
                  </ButtonsInnerWrapperExpired>
                </ButtonsWrapper>
              </ContentWrapper>
            </Wrapper>
          ) : (
            <Wrapper style={wrapperStyles}>
              <MobileHeader whiteBackButton />
              <Img
                style={{
                  backgroundImage: `url(${EmailErrorImage})`,
                }}
              />
              <ContentWrapper className="left">
                <StyledH1>That link is invalid</StyledH1>
                <StyledH3>
                  If you already registered we can resend you a link
                </StyledH3>

                <form noValidate onSubmit={handleSubmitForm}>
                  <Input
                    value={email}
                    label="Email Address"
                    required
                    size="medium"
                    fullWidth
                    type="email"
                    helperText="We will never share or sell your information for any reason"
                    onChange={onChangeEmail}
                  />
                </form>

                <ButtonsWrapper>
                  <ButtonsInnerWrapper>
                    <div onClick={handleSubmit}>
                      <OutlinedButton white fullWidth active={validateEmail()}>
                        Resend Email
                      </OutlinedButton>
                    </div>
                    <div>
                      <Link to="/you/register">
                        <OutlinedButton white fullWidth>
                          REGISTER
                        </OutlinedButton>
                      </Link>
                    </div>
                  </ButtonsInnerWrapper>
                </ButtonsWrapper>
              </ContentWrapper>
            </Wrapper>
          )}
        </div>
      )}
    </>
  );
};

export default EmailConfirmationWrapper;
