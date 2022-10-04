/**
 *
 * ProfileInfo
 *
 */

import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { Font16 } from '/components/shared/typogrophy';
import BlackButton from '/components/shared/buttons/BlackButton';
import PhoneInput from '/components/shared/PhoneInput';
import EmailInput, { isValidEmail } from '/components/shared/EmailInput';
import { HomePageContext } from '/containers/HomePage';

const InnerButton = styled(Font16)`
  text-align: center;
  color: #fff;
  font-weight: 600;
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

      @media only screen and (min-width: 768px) {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
`;

const fields = [
  {
    label: 'Full Name',
    key: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'Email',
    key: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'Phone',
    key: 'phone',
    type: 'phone',
  },

  {
    label: 'Zip Code',
    key: 'zipcode',
    type: 'text',
    required: true,
  },
];

function RegisterForm({ submitCallback }) {
  const { registerCallback, user } = useContext(HomePageContext);
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
    zipcode: '',
  });

  useEffect(() => {
    if (user) {
      const updated = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        zipcode: user.zip || '',
      };
      setState(updated);
    }
  }, [user]);

  const submit = () => {
    registerCallback(state.name, state.email, state.phone, state.zipcode);
    submitCallback();
  };

  const canSubmit = () =>
    state.name != '' &&
    isValidEmail(state.email) &&
    state.zipcode !== '' &&
    state.zipcode.length === 5;

  const onChangeField = (value, key) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form noValidate onSubmit={handleSubmitForm} id="homepage-register-form">
      <div>
        {fields.map((field, index) => (
          <React.Fragment key={field.key}>
            {field.type === 'phone' ? (
              <PhoneInput
                value={state[field.key]}
                onChangeCallback={(phone) => {
                  onChangeField(phone, field.key);
                }}
                hideIcon
              />
            ) : (
              <>
                {field.type === 'email' ? (
                  <EmailInput
                    value={state[field.key]}
                    onChangeCallback={(e) => {
                      onChangeField(e.target.value, field.key);
                    }}
                    hideIcon
                  />
                ) : (
                  <Input
                    key={index}
                    value={state[field.key]}
                    label={field.label}
                    required={field.required}
                    fullWidth
                    type={field.type}
                    name={field.key}
                    variant="outlined"
                    onChange={(e) => onChangeField(e.target.value, field.key)}
                    error={state.errorField === field.key}
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </div>

      <BlackButton
        fullWidth
        onClick={submit}
        type="submit"
        disabled={!canSubmit()}
      >
        <InnerButton>
          <span>Sign Up</span>
        </InnerButton>
      </BlackButton>
    </form>
  );
}

export default RegisterForm;
