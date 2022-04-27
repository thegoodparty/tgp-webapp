/**
 *
 * UpdatesForm
 *
 */

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2 } from '../shared/typogrophy';
import { validateEmail } from '../../helpers/emailHelper';
import BlackButton from '../shared/buttons/BlackButton';
import { UPDATE_FORM_NOTIFICATIONS } from '../../utils/constants';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.grayE};
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 48px 10px;
  }
`;

const MaxContent = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Content = styled(MaxContent)`
  padding: 12px 4px;
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 16px;
  line-height: 25px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 18px;
    padding: 48px 12px;
  }
`;

const StyledH2 = styled(H2)`
  margin-bottom: 24px;
  margin-top: 24px;

  font-size: 32px;
  line-height: 38px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 48px;
    line-height: 62px;
    margin-top: 8px;
  }
`;

const Form = styled.form`
  width: 90%;
  max-width: 800px;
  margin: 12px auto;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
`;
function UpdatesForm({ notificationsCallback }) {
  const [email, setEmail] = useState('');
  const [notificationsPref, setNotificationPref] = useState({});

  const handleCheckRole = (role, value) => {
    if (value) {
      setNotificationPref({
        ...notificationsPref,
        [role]: true,
      });
    } else {
      const updated = { ...notificationsPref };
      delete updated[role];
      setNotificationPref(updated);
    }
  };

  const canSubmit = () =>
    validateEmail(email) && Object.keys(notificationsPref).length > 0;

  const submitForm = () => {
    notificationsCallback(email, notificationsPref);
    setEmail('');
    setNotificationPref({});
  };
  return (
    <Wrapper>
      <Content>
        <Form>
          <div className="text-center">
            <strong data-cy="update-form-question">Nothing available that matches your skill set?</strong>
            <StyledH2 data-cy="update-form-title">Sign up for future updates</StyledH2>
          </div>

          <strong>Your email</strong>
          <br />
          <br />
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <br />
          <br />
          {UPDATE_FORM_NOTIFICATIONS.map(notification => (
            <div key={notification.key} data-cy="notification">
              <Checkbox
                color="primary"
                onChange={event =>
                  handleCheckRole(notification.key, event.target.checked)
                }
              />{' '}
              {notification.label}
            </div>
          ))}
          <br />
          <br />
          <BlackButton disabled={!canSubmit()} onClick={submitForm} data-cy="update-form-submit">
            &nbsp;&nbsp; Get Notified &nbsp;&nbsp;
          </BlackButton>
        </Form>
      </Content>
    </Wrapper>
  );
}

UpdatesForm.propTypes = {
  notificationsCallback: PropTypes.func,
};

export default UpdatesForm;
