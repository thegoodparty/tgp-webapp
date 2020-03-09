import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { Body13, H2 } from 'components/shared/typogrophy/index';
import NextButton from 'components/shared/buttons/NextButton';

import ThankYouImage from 'images/thank-you.png';

const Img = styled.img`
  width: 230px;
  height: auto;
  margin-bottom: 20px;
`;
const Input = styled(TextField)`
  && {
    margin-bottom: 48px;

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

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const Error = styled(Body13)`
  color: red;
  font-weight: 600;
  margin-top: 12px;
`;

const Login = styled.span`
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  font-weight: 600;
  text-decoration: underline;
  margin-left: 4px;
`;

const RegisterWrapper = ({ registerCallback, loading, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');

  const onChangeName = event => {
    setName(event.target.value);
  };

  const onChangeEmail = event => {
    setEmail(event.target.value);
  };

  const onChangeComments = event => {
    setComments(event.target.value);
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
      registerCallback(email, name, comments);
    }
  };

  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <Hidden smDown>
          <Img src={ThankYouImage} />
        </Hidden>
        <H2>Thank you for your support!</H2>
        <Body13 style={{ marginTop: '16px', marginBottom: '28px' }}>
          Please enter your contact information so we can count your support,
          and so we can notify you when we make enough progress!
        </Body13>
        <form noValidate onSubmit={handleSubmitForm}>
          <Input
            value={name}
            label="Full Name"
            required
            placeholder="John Smith"
            size="medium"
            fullWidth
            onChange={onChangeName}
          />

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

          <Input
            value={comments}
            label="Please share any good ideas or comments:"
            size="medium"
            fullWidth
            multiline
            rows={2}
            rowsMax={8}
            onChange={onChangeComments}
            helperText={
              <span>
                By signing up, you agree to the{' '}
                <a href="/terms" className="blue">
                  Terms of Service.
                </a>
              </span>
            }
          />
          {!loading && (
            <SubmitWrapper onClick={handleSubmit}>
              <NextButton active={validateEmail() && name !== ''}>
                Submit
              </NextButton>
              {error && error.exists && (
                <Error>
                  {error.message}{' '}
                  <Login>
                    <Link to="/login">Login</Link>
                  </Login>
                </Error>
              )}
            </SubmitWrapper>
          )}
        </form>
      </Wrapper>
    </div>
  );
};

export default RegisterWrapper;
