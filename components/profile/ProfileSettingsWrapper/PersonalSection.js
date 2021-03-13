/**
 *
 * PersonalSection
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';

import { Body13, H1 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';
import { formatToPhone } from '../../../helpers/phoneHelper';

const Wrapper = styled.section`
  padding: 32px 0;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: solid 1px ${({ theme }) => theme.colors.purple4};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 25px 0;
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
`;

const StyledTextField = styled(TextField)`
  && {
    background-color: #fff;
    box-shadow: 0px 2px 0px rgba(17, 17, 31, 0.25);
    border-radius: 8px;
  }
`;

function PersonalSection({ user, updateUserCallback }) {
  const [editEnabled, setEditEnabled] = useState({});
  const { name, email, phone } = user;

  const initialValues = {
    name,
    email,
    phone: formatToPhone(phone),
  };

  const [formFields, setFormFields] = useState({
    name: { label: 'Full Name', value: initialValues.name },
    email: { label: 'Email', value: initialValues.email },
    phone: { label: 'Mobile number', value: initialValues.phone },
    password: { label: 'Password', value: '********' },
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
              value={fieldKey === 'password' ? '' : field.value}
              onChange={e => onChangeField(fieldKey, e.target.value)}
              type={fieldKey === 'password' ? 'password' : 'text'}
            />
            <PurpleButton style={{ marginTop: '24px' }} onClick={handleSave}>
              <span style={{ padding: '0 24px' }}>SAVE</span>
            </PurpleButton>
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
  return (
    <Wrapper>
      {Object.keys(formFields).map(field => (
        <Row key={formFields[field].label}>
          <div style={{ flex: 1 }}>
            <Label>{formFields[field].label}</Label>
            <Hidden mdDown>{EditableValue(field)}</Hidden>
          </div>
          <Hidden mdUp>{EditableValue(field)}</Hidden>
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
    </Wrapper>
  );
}

PersonalSection.propTypes = {
  user: PropTypes.object,
  updateUserCallback: PropTypes.func,
};

export default PersonalSection;
