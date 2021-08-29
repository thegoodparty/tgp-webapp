/**
 *
 * ConfirmWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import PageWrapper from '../../shared/PageWrapper';
import { Body, Body13, H1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import { formatToPhone } from '../../../helpers/phoneHelper';

const heartImg = '/images/heart.svg';
const Heart = styled.img`
  display: block;
  width: 64px;
  height: auto;
  margin: 0 auto 12px;
`;

const Wrapper = styled.div`
  padding: 24px 0;
  max-width: 600px;
  margin: 0 auto;
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BottomLink = styled(Body13)`
  color: blue;
  cursor: pointer;
`;

function ConfirmWrapper({ user, confirmCodeCallback, resendCodeCallback }) {
  const [token, setToken] = useState('');
  console.log('u', user);

  const { phone, email } = user;
  const hasPhone = !!phone;

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const enableSubmit = () => token !== '';

  const handleSubmit = () => {
    if (enableSubmit()) {
      confirmCodeCallback(token);
    }
  };

  const resendCode = () => {
    resendCodeCallback();
  };
  return (
    <PageWrapper purple>
      <Wrapper>
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <Heart src={heartImg} />
          <H1 data-cy="title">Confirm your account</H1>
          <br />
          <Body>
            We sent your confirmation token to{' '}
            {hasPhone ? formatToPhone(phone) : email}
          </Body>
        </div>
        <form noValidate onSubmit={handleSubmitForm}>
          <Input
            value={token}
            label="Code"
            required
            size="medium"
            fullWidth
            name="Code"
            variant="outlined"
            onChange={e => setToken(e.target.value)}
          />
          <PurpleButton
            fullWidth
            disabled={!enableSubmit()}
            onClick={handleSubmit}
            type="submit"
          >
            Confirm
          </PurpleButton>
        </form>
        <br />
        <Row>
          <BottomLink onClick={resendCode}>Resend Token</BottomLink>
          {hasPhone && email && <BottomLink>Confirm with email</BottomLink>}
        </Row>
      </Wrapper>
    </PageWrapper>
  );
}

ConfirmWrapper.propTypes = {
  user: PropTypes.object,
  confirmCodeCallback: PropTypes.func,
  resendCodeCallback: PropTypes.func,
};

export default ConfirmWrapper;
