/**
 *
 * PersonalSection
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import { BsChevronRight, BsLock } from 'react-icons/bs';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { formatToPhone } from 'helpers/phoneHelper';

import { Body13, H1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import AlertDialog from '../../shared/AlertDialog';

const Wrapper = styled.section`
  padding: 32px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: solid 1px ${({ theme }) => theme.colors.purple4};

  &.with-save {
    flex-direction: column;
    align-items: flex-start;

    .chevron {
      display: none;
    }
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 25px 0;
    &.with-save {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: ;
    }
  }
`;

const Label = styled(Body13)`
  font-weight: 700;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 10px;
  }
`;

const Value = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  text-align: right;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: left;
  }
`;

const NotVerified = styled.div`
  color: red;
  margin-top: 8px;
`;

const Action = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  padding-left: 24px;
  align-self: flex-start;
`;

const StyledTextField = styled(TextField)`
  && {
    background-color: #fff;
    box-shadow: 0 2px 0 rgba(17, 17, 31, 0.25);
    border-radius: 8px;
    margin-top: 8px;
  }
`;

const ChevronWrapper = styled.div`
  font-size: 10px;
  padding-left: 12px;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Cancel = styled.div`
  margin-top: 20px;
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: none;
  }
`;

const ButtonCancelWrapper = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
  }
`;

const Privacy = styled.div`
  margin-top: 24px;
  border: 1px solid ${({ theme }) => theme.colors.purple4};
  padding: 38px;
  border-radius: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray6};
`;

const PhoneWrapper = styled.div`
  margin-bottom: 24px;
  .phone-input {
    width: 100%;
    height: 60px;
    line-height: 22px;
    font-size: 16px;
    padding-left: 16px;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      font-size: 20px;
      line-height: 26px;
      ::placeholder {
        font-size: 16px;
      }
    }
  }

  .flag-dropdown {
    display: none;
  }
`;

function PersonalSection({
  user,
  updateUserCallback,
  changePasswordCallback,
  setUser,
}) {
  const [editEnabled, setEditEnabled] = useState({});
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [canChangePassword, setCanChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const {
    name,
    displayName,
    pronouns,
    email,
    phone,
    zip,
    isPhoneVerified,
    isEmailVerified,
  } = user;
  useEffect(() => {
    canSubmitPassword();
  }, [password, oldPassword]);

  const [formFields, setFormFields] = useState({});
  useEffect(() => {
    const initialValues = {
      name,
      displayName: displayName || '',
      email,
      phone: formatToPhone(phone),
      zip: zip || '',
      pronouns: pronouns || '',
    };
    setFormFields({
      name: { label: 'Full Name', value: initialValues.name },
      email: { label: 'Email', value: initialValues.email },
      phone: { label: 'Mobile number', value: initialValues.phone },
      zip: { label: 'Zip Code', value: initialValues.zip },
      displayName: { label: 'Display Name', value: initialValues.displayName },
      pronouns: { label: 'Preferred Pronouns', value: initialValues.pronouns },
    });
    if(user.isEmailVerified) {
      localStorage.setItem('verifiedEmail', user.email);
    }
  }, [user]);
  const onChangeField = (key, val) => {
    setFormFields({
      ...formFields,
      [key]: { ...formFields[key], value: val },
    });
  };
  const EditableValue = fieldKey => {
    const field = formFields[fieldKey];
    const handleSave = () => {
      updateUserCallback(fieldKey, field.value);
      setUser({ ...user, [fieldKey]: field.value });
      if(fieldKey === 'email') {
        if(localStorage.getItem('verifiedEmail') === field.value) {
          setUser({ ...user, isEmailVerified: true });
          updateUserCallback('isEmailVerified', true);
        }
        else {
          setUser({ ...user, isEmailVerified: false });
          updateUserCallback('isEmailVerified', false);
        }
      }
      setEditEnabled({
        ...editEnabled,
        [formFields[fieldKey].label]: false,
      });

      // format the phone after save
      if (fieldKey === 'phone') {
        setFormFields({
          ...formFields,
          phone: {
            ...formFields[fieldKey],
            value: formatToPhone(formFields.phone.value),
          },
        });
      }
    };
    return (
      <>
        {editEnabled[field.label] ? (
          <>
            {field.label === 'Mobile number' ? (
              <PhoneWrapper>
                <PhoneInput
                  disableCountryCode
                  country="us"
                  disableDropdown
                  inputClass="phone-input"
                  placeholder="Phone Number"
                  onlyCountries={['us']}
                  value={field.value}
                  onChange={phoneVal => onChangeField(fieldKey, phoneVal)}
                />
              </PhoneWrapper>
            ) : (
              <StyledTextField
                fullWidth
                variant="outlined"
                value={field.value}
                onChange={e => onChangeField(fieldKey, e.target.value)}
              />
            )}

            <ButtonCancelWrapper>
              <PurpleButton
                style={{ marginTop: '24px' }}
                disabled={field.value === ''}
                onClick={handleSave}
              >
                <span style={{ padding: '0 24px' }}>SAVE</span>
              </PurpleButton>
              <Cancel
                onClick={() => {
                  cancelField(fieldKey);
                }}
              >
                Cancel
              </Cancel>
            </ButtonCancelWrapper>
          </>
        ) : (
          <Value>
            {field.value} <br />
            {field.label === 'Email' &&
              field.value &&
              field.value !== '' &&
              !isEmailVerified && (
                <NotVerified>
                  This email is not verified
                  <br />
                  <Link href="/register/confirm" passHref>
                    <a>Verify Your Email</a>
                  </Link>
                </NotVerified>
              )}
            {field.label === 'Mobile number' &&
              field.value &&
              field.value !== '' &&
              !isPhoneVerified && (
                <NotVerified>
                  This phone is not verified
                  <br />
                  <Link href="/register/confirm" passHref>
                    <a>Verify Your Phone</a>
                  </Link>
                </NotVerified>
              )}
          </Value>
        )}
      </>
    );
  };

  const cancelField = field => {
    setEditEnabled({
      ...editEnabled,
      [formFields[field].label]: false,
    });
    onChangeField(field, initialValues[field]);
  };

  const canSubmitPassword = () => {
    if (
      user.hasPassword &&
      password !== '' &&
      oldPassword !== '' &&
      password.length > 7
    ) {
      setCanChangePassword(true);
      return true;
    }
    if (!user.hasPassword && password !== '' && password.length > 7) {
      setCanChangePassword(true);
      return true;
    }
    setCanChangePassword(false);
    return false;
  };
  const handleSavePassword = () => {
    if (canSubmitPassword()) {
      changePasswordCallback(password, oldPassword);
      setEditPassword(false);
      setPassword('');
      setOldPassword('');
    }
  };

  const showEdit = field => {
    if (!editEnabled[formFields[field].label] && window.innerWidth < 960) {
      setEditEnabled({
        ...editEnabled,
        [formFields[field].label]: true,
      });
    }
  };

  return (
    <Wrapper>
      {Object.keys(formFields).map(field => (
        <Row
          key={formFields[field].label}
          className={editEnabled[formFields[field].label] && 'with-save'}
          onClick={() => {
            showEdit(field);
          }}
        >
          <div style={{ flex: 1 }}>
            <Label>
              {formFields[field].label} <BsLock size={12} color="#767676" />
            </Label>
            <Hidden smDown>{EditableValue(field)}</Hidden>
          </div>
          <Hidden mdUp>
            {EditableValue(field)}
            <ChevronWrapper
              className="chevron"
              onClick={() => {
                setEditEnabled({
                  ...editEnabled,
                  [formFields[field].label]: true,
                });
              }}
            >
              <BsChevronRight />
            </ChevronWrapper>
          </Hidden>
          <Hidden smDown>
            {editEnabled[formFields[field].label] ? (
              <Action
                onClick={() => {
                  cancelField(field);
                }}
              >
                Cancel
              </Action>
            ) : (
              <Action
                onClick={() => {
                  setEditEnabled({
                    ...editEnabled,
                    [formFields[field].label]: true,
                  });
                }}
              >
                {!formFields[field].value || formFields[field].value === ''
                  ? 'Add'
                  : 'Edit'}
              </Action>
            )}
          </Hidden>
        </Row>
      ))}

      <Row>
        <div style={{ flex: 1 }}>
          <Label>Password</Label>
          {editPassword ? (
            <>
              {user.hasPassword && (
                <StyledTextField
                  label="Old Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  value={oldPassword}
                  onChange={e => {
                    setOldPassword(e.target.value);
                  }}
                  style={{ marginBottom: '16px' }}
                />
              )}
              <StyledTextField
                label="Password"
                fullWidth
                variant="outlined"
                value={password}
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <small>8 characters minimum</small>
              <br />
              <ButtonCancelWrapper>
                <PurpleButton
                  style={{ marginTop: '24px' }}
                  onClick={handleSavePassword}
                  disabled={!canChangePassword}
                >
                  <span style={{ padding: '0 24px' }}>SAVE</span>
                </PurpleButton>
                <Cancel onClick={() => setEditPassword(false)}>Cancel</Cancel>
              </ButtonCancelWrapper>
            </>
          ) : (
            <>{user.hasPassword ? '********' : 'Not Set Yet'}</>
          )}
        </div>
        <Hidden mdUp>
          <ChevronWrapper
            className="chevron"
            onClick={() => {
              setEditPassword(true);
            }}
          >
            <BsChevronRight />
          </ChevronWrapper>
        </Hidden>
        <Hidden smDown>
          {editPassword ? (
            <Action
              onClick={() => {
                setEditPassword(false);
              }}
            >
              Cancel
            </Action>
          ) : (
            <Action
              onClick={() => {
                setEditPassword(true);
              }}
            >
              {user.hasPassword ? 'Edit' : 'Add'}
            </Action>
          )}
        </Hidden>
      </Row>

      <Privacy>
        <BsLock size={24} color="#919191" />
        <br />
        Good Party doesn&apos;t sell or share
        <br />
        your personal data
      </Privacy>
    </Wrapper>
  );
}

PersonalSection.propTypes = {
  user: PropTypes.object,
  updateUserCallback: PropTypes.func,
  changePasswordCallback: PropTypes.func,
  setUser: PropTypes.func,
};

export default PersonalSection;
