import React from 'react';
import SocialLogin from 'react-social-login';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import tgpTheme from '/theme/index';
import { Body11 } from '../../shared/typogrophy';

const StyledButton = styled(Button)`
  && {
    border-radius: 8px;
    padding: 16px 4px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
    position: relative;
    text-align: center;

    &.facebook {
      background-color: #507cc0;
    }
    &.google {
      background-color: #fff;
      box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
    }
  }
`;

const StyledBody11 = styled(Body11)`
  color: #fff;
  font-weight: 500;
  padding-left: 16px;
  font-size: 10px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 14px;
  }

  &.google {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 7px;
  top: 14px;
  font-size: 16px;
  padding: 2px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    left: 12px;
    top: 12px;
    font-size: 20px;
    width: 22px;
    height: 22px;
  }

  &.with-shadow {
    background: #ffffff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.0536402);
    border-radius: 50%;
  }
`;

const SocialButton = ({ triggerLogin, children, channel, ...props }) => {
  const icon = () => {
    if (channel === 'facebook') {
      return (
        <Icon>
          <FaFacebook />
        </Icon>
      );
    }
    if (channel === 'google') {
      return (
        <Icon className="with-shadow">
          <FcGoogle />
        </Icon>
      );
    }
    return (
      <Icon>
        <FaFacebook />
      </Icon>
    );
  };

  return (
    <StyledButton
      fullWidth
      onClick={triggerLogin}
      {...props}
      className={channel}
      data-cy={`${channel}-social-login`}
    >
      <div className="text-center">
        <StyledBody11 className={channel}>
          {icon()} {children}
        </StyledBody11>
      </div>
    </StyledButton>
  );
};

SocialButton.propTypes = {
  channel: PropTypes.string,
  triggerLogin: PropTypes.func,
  children: PropTypes.string,
};

export default SocialLogin(SocialButton);
