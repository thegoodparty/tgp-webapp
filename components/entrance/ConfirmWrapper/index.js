/**
 *
 * ConfirmWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';


import { formatToPhone } from 'helpers/phoneHelper';

import PageWrapper from '../../shared/PageWrapper';
import { Body, Body13, H1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

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

  &.center {
    justify-content: center;
  }
`;
const BottomLink = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
`;

const Edit = styled(Body13)`
  display: inline-block;
  padding-left: 12px;
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
`;

function ConfirmWrapper({
  user,
  confirmCodeCallback,
  resendCodeCallback,
  confirmWithEmailCallback,
  updateInfoCallback,
  fromLogin,
  loginValue,
  loginValueType,
}) {
  const [token, setToken] = useState('');
  const [edit, setEdit] = useState(false);
  let email;
  let phone;
  if (fromLogin) {
    if (loginValueType === 'email') {
      email = loginValue;
    } else {
      phone = loginValue;
    }
  } else {
    ({ email } = user);
    ({ phone } = user);
  }
  const hasPhone = !!phone;
  const [field, setField] = useState(hasPhone ? phone : email);

  const handleSubmitForm = e => {
    e.preventDefault();
  };

  const enableSubmit = () => token !== '';

  const handleSubmit = () => {
    if (enableSubmit()) {
      if (fromLogin) {
        confirmCodeCallback(token, loginValue, loginValueType);
      } else {
        confirmCodeCallback(token);
      }
    }
  };

  const resendCode = () => {
    resendCodeCallback();
  };

  const updateInfo = newValue => {
    setField(newValue);
  };

  const handleSaveInfo = () => {
    setEdit(false);

    updateInfoCallback({
      field: hasPhone ? 'phone' : 'email',
      newValue: field,
    });
  };
  return (
    <PageWrapper purple>
      <Wrapper>
        <div
          className="text-center"
          style={{ marginBottom: '32px', paddingTop: '32px' }}
        >
          <H1 data-cy="title">
            Verify your {hasPhone ? 'phone number' : 'email'}
          </H1>
          <br />
          <Body>
            We sent a verification code to
            {edit ? (
              <Row className="center" style={{ marginTop: '16px' }}>
                <Input
                  value={field}
                  label={`Edit your ${hasPhone ? 'phone' : 'email'}`}
                  size="medium"
                  variant="outlined"
                  onChange={e => updateInfo(e.target.value)}
                />

                <PurpleButton
                  style={{ padding: '4px 8px', marginLeft: '8px' }}
                  onClick={handleSaveInfo}
                >
                  Save
                </PurpleButton>
              </Row>
            ) : (
              <div>
                <strong>{hasPhone ? formatToPhone(field) : field}</strong>
                {!fromLogin && <Edit onClick={() => setEdit(true)}>Edit</Edit>}
              </div>
            )}
          </Body>
        </div>
        <form noValidate onSubmit={handleSubmitForm}>
          <Input
            value={token}
            label="Enter verification code"
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
        {!fromLogin && (
          <Row>
            <BottomLink onClick={resendCode}>Resend Code</BottomLink>
            {hasPhone && email && (
              <BottomLink onClick={confirmWithEmailCallback}>
                Verify with email
              </BottomLink>
            )}
          </Row>
        )}
      </Wrapper>
    </PageWrapper>
  );
}

ConfirmWrapper.propTypes = {
  user: PropTypes.object,
  confirmCodeCallback: PropTypes.func,
  resendCodeCallback: PropTypes.func,
  confirmWithEmailCallback: PropTypes.func,
  updateInfoCallback: PropTypes.func,
  fromLogin: PropTypes.bool,
  loginValue: PropTypes.string,
  loginValueType: PropTypes.string,
};

export default ConfirmWrapper;
