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

import { formatToPhone } from 'helpers/phoneHelper';

import { Body13, H1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

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

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 10px;
  }
`;

const Value = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
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
    box-shadow: 0px 2px 0px rgba(17, 17, 31, 0.25);
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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const ButtonCancelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

function PersonalSection({ user, updateUserCallback, changePasswordCallback }) {
  const [editEnabled, setEditEnabled] = useState({});
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [canChangePassword, setCanChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const { name, email, phone } = user;

  useEffect(() => {
    canSubmitPassword();
  }, [password, oldPassword]);

  const initialValues = {
    name,
    email,
    phone: formatToPhone(phone),
  };

  const [formFields, setFormFields] = useState({
    name: { label: 'Full Name', value: initialValues.name },
    email: { label: 'Email', value: initialValues.email },
    phone: { label: 'Mobile number', value: initialValues.phone },
  });

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
      setEditEnabled({
        ...editEnabled,
        [formFields[fieldKey].label]: false,
      });
    };
    return (
      <>
        {editEnabled[field.label] ? (
          <>
            <StyledTextField
              fullWidth
              variant="outlined"
              value={field.value}
              onChange={e => onChangeField(fieldKey, e.target.value)}
            />
            <ButtonCancelWrapper>
              <PurpleButton style={{ marginTop: '24px' }} onClick={handleSave}>
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
          <Value>{field.value}</Value>
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
  return (
    <Wrapper>
      {Object.keys(formFields).map(field => (
        <Row
          key={formFields[field].label}
          className={editEnabled[formFields[field].label] && 'with-save'}
        >
          <div style={{ flex: 1 }}>
            <Label>
              {formFields[field].label} <BsLock size={12} color="#767676" />
            </Label>
            <Hidden mdDown>{EditableValue(field)}</Hidden>
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
          <Hidden mdDown>
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
          <Hidden mdDown>
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
                <PurpleButton
                  style={{ marginTop: '24px' }}
                  onClick={handleSavePassword}
                  disabled={!canChangePassword}
                >
                  <span style={{ padding: '0 24px' }}>SAVE</span>
                </PurpleButton>
              </>
            ) : (
              <>{user.hasPassword ? '********' : 'Not Set Yet'}</>
            )}
          </Hidden>
        </div>
        <Hidden mdUp>Hmm</Hidden>
        <Hidden mdDown>
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
    </Wrapper>
  );
}

PersonalSection.propTypes = {
  user: PropTypes.object,
  updateUserCallback: PropTypes.func,
  changePasswordCallback: PropTypes.func,
};

export default PersonalSection;
