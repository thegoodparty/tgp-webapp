/**
 *
 * UpdatesForm
 *
 */

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2 } from '../shared/typogrophy';
import { PurpleButton } from '../shared/buttons';
import { validateEmail } from '../../helpers/emailHelper';

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

const notifications = [
  {
    key: 'new-job-notifications',
    label: 'I would like to receive an email when new jobs are announced',
  },
  {
    key: 'updates-notifications',
    label: 'I would like to receive Good Party updates',
  },
];

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
            <strong>Nothing available that matches your skill set?</strong>
            <StyledH2>Sign up for future updates</StyledH2>
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
          {notifications.map(notification => (
            <div key={notification.key}>
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
          <PurpleButton disabled={!canSubmit()} onClick={submitForm}>
            &nbsp;&nbsp; Get Notified &nbsp;&nbsp;
          </PurpleButton>
        </Form>
      </Content>
    </Wrapper>
  );
}

UpdatesForm.propTypes = {
  notificationsCallback: PropTypes.func,
};

export default UpdatesForm;
