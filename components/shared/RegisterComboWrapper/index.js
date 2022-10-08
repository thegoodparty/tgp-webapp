/**
 *
 * RegisterComboWrapper
 *
 */

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { RegisterComboContainerContext } from '/containers/shared/RegisterComboContainer';
import BlackButton, { InnerButton } from '../buttons/BlackButton';
import { isValidEmail } from '../EmailInput';
import YellowButton from '../buttons/YellowButton';
// import { setCookie } from '../../../helpers/cookieHelper';
// import { candidateRoute } from '../../../helpers/electionsHelper';

const Wrapper = styled.div`
  input {
    padding: 18px 10px;
    border: 1px solid #c2c2c2;
    width: 100%;
    outline: none;
    border-radius: 4px;
    margin-bottom: 8px;

    &:focus {
      border: 1px solid #000;
    }
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    input {
      margin-bottom: 0;
    }
  }
`;

const Title = styled.h3`
  font-size: 28px;
  margin: 0 0 20px;
  font-weight: 900;
`;

const SubTitle = styled.div`
  padding-bottom: 35px;
  margin-bottom: 35px;
  font-size: 17px;
  border-bottom: solid 1px #ececec;
`;

const Overflow = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 100%;
    overflow: hidden;
  }
`;

const Inner = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 300%;
    transition: width 0.4s, border 0.4s;

    &.active {
      width: 100%;
      border: solid 2px #000;
      border-radius: 4px;

      input {
        border: none;
        border-right: 1px solid #c2c2c2;
        border-radius: 0;

        &#register-zip {
          border: none;
        }
        &#register-email {
          border-radius: 0;
          border: none;
          border-right: 1px solid #c2c2c2;
        }
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 13px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 0;
  }
`;

const ResponsiveRow = styled.div`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: flex;
    align-items: center;
  }
`;

const BottomRow = styled.div`
  margin-top: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-top: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-top: 70px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    text-align: left;
    margin-top: 0;
  }
`;

const fields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'name',
    type: 'text',
    placeholder: 'Name',
  },
  {
    name: 'zip',
    type: 'text',
    placeholder: 'Zip',
  },
];

function RegisterComboWrapper() {
  const { registerCallback, afterRegisterCallback, afterLoginRoute } =
    useContext(RegisterComboContainerContext);
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    email: '',
    name: '',
    zip: '',
  });

  const onChangeField = (key, val) => {
    const newState = {
      ...state,
      [key]: val,
    };
    setState(newState);
  };

  const canSubmit = () =>
    isValidEmail(state.email) &&
    state.name.length > 1 &&
    state.zip.length === 5;

  const submitForm = () => {
    registerCallback(state.email, state.name, state.zip, afterRegisterCallback);
  };

  // const setReturnCookie = () => {
  //   if (afterLoginRoute) {
  //     setCookie('returnUrlLogin', afterLoginRoute);
  //   }
  // };
  return (
    <Wrapper>
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        id="register-combo-form"
      >
        <ResponsiveRow>
          <Overflow>
            <Inner className={isActive && 'active'}>
              <Grid container spacing={0}>
                {fields.map((field) => (
                  <Grid xs={12} lg={4} key={field.name}>
                    <input
                      name={field.name}
                      type={field.type}
                      id={`register-${field.name}`}
                      placeholder={field.placeholder}
                      value={state[field.name]}
                      onBlur={() => setIsActive(false)}
                      onFocus={() => setIsActive(true)}
                      onChange={(e) =>
                        onChangeField(field.name, e.target.value)
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Inner>
          </Overflow>
          <ButtonWrapper>
            <YellowButton
              type="submit"
              disabled={!canSubmit()}
              onClick={submitForm}
              className="custom-radius"
            >
              <InnerButton style={{ whiteSpace: 'nowrap' }}>
                JOIN US
              </InnerButton>
            </YellowButton>
          </ButtonWrapper>
        </ResponsiveRow>
      </form>
    </Wrapper>
  );
}

RegisterComboWrapper.propTypes = {};

export default RegisterComboWrapper;
