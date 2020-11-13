import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import FacebookIcon from 'public/images/icons/facebook-white.svg';
import tgpTheme from 'theme/index';
import { Body13 } from '../../shared/typogrophy';

const StyledButton = styled(Button)`
  && {
    margin-top: 18px;
    border-radius: 30px;
    padding: 12px 32px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    color: #fff;
    position: relative;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08),
      0px 0px 16px rgba(0, 0, 0, 0.12);
    background-color: #507cc0;

    &:hover {
      background-color: #507cc0;
    }
  }
`;

const StyledBody13 = styled(Body13)`
  color: #fff;
  font-weight: 500;

  &.google {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Icon = styled.img`
  width: 10px;
  height: auto;
  position: absolute;
  left: 24px;
  top: 12px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 12px;
    top: 14px;
  }
`;

const FacebookButton = ({ onLoginSuccess, onLoginFailure, children }) => {
  const triggerLogin = () => {
    window.FB.getLoginStatus(response => {
      handleSuccessfulResponse(response);
    });
  };

  const generateUser = response => ({
    profile: {
      id: response.id,
      name: response.name,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      profilePicURL: response.picture?.data?.url,
    },
    token: {
      accessToken: response.accessToken,
    },
  });

  /**
   * Gets Facebook user profile if connected.
   * @param {Object} response
   */
  const handleLoginStatus = response =>
    new Promise((resolve, reject) => {
      switch (response.status) {
        case 'connected':
          getProfile().then(profile =>
            resolve({
              ...profile,
              ...response.authResponse,
            }),
          );

          break;
        case 'not_authorized':
          return reject({
            provider: 'facebook',
            type: 'auth',
            description: 'Not Authorized',
            error: response,
          });
        case 'unknown':
          login();
      }
    });

  const login = () => {
    FB.login(
      response => {
        handleSuccessfulResponse(response);
      },
      { scope: 'public_profile,email' },
    );
  };

  const handleSuccessfulResponse = response => {
    handleLoginStatus(response).then(profile => {
      const user = generateUser(profile);
      const res = {
        _profile: user?.profile,
        _provider: 'facebook',
        _token: user?.token,
      };
      onLoginSuccess(res);
    }, onLoginFailure);
  };

  /**
   * Gets currently logged in user profile data.
   * Requires SDK to be loaded first.
   * @see https://developers.facebook.com/tools/explorer?method=GET&path=me%3Ffields%3Demail%2Cname%2Cid%2Cfirst_name%2Clast_name%2Cpicture&version=v2.9
   */
  const getProfile = () =>
    new Promise(resolve => {
      window.FB.api(
        '/me',
        'GET',
        {
          fields: 'email,name,id,first_name,last_name,picture',
        },
        resolve,
      );
    });

  return (
    <StyledButton fullWidth onClick={triggerLogin}>
      <div data-cy="facebook-login">
        <Icon src={FacebookIcon} alt="" />
        <StyledBody13>{children}</StyledBody13>
      </div>
    </StyledButton>
  );
};

FacebookButton.propTypes = {
  onLoginSuccess: PropTypes.func,
  onLoginFailure: PropTypes.func,
  children: PropTypes.string,
};

export default FacebookButton;
