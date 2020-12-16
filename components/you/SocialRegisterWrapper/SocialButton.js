import React from 'react';
import SocialLogin from 'react-social-login';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import tgpTheme from 'theme/index';
import { Body13 } from '../../shared/typogrophy';

const FacebookIcon = '/images/icons/facebook-white.svg';
const GoogleIcon = '/images/icons/google-icon.svg';
const StyledButton = styled(Button)`
  && {
    margin-top: 18px;
    border-radius: 30px;
    padding: 12px 32px;
    font-family: ${tgpTheme.typography.fontFamily};
    letter-spacing: 0.2px;
    background-color: ${({ theme }) => theme.colors.blue};
    color: #fff;
    position: relative;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08),
      0px 0px 16px rgba(0, 0, 0, 0.12);

    &.facebook {
      background-color: #507cc0;
    }
    &.google {
      background-color: #fff;
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

const GoogleIconImg = styled.img`
  width: 26px;
  height: auto;
  position: absolute;
  left: 15px;
  top: 10px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 32px;
    top: 10px;
    left: 14px;
  }
`;

const SocialButton = ({ triggerLogin, children, channel, ...props }) => {
  const icon = () => {
    if (channel === 'facebook') {
      return <Icon src={FacebookIcon} alt="" />;
    }
    if (channel === 'google') {
      return <GoogleIconImg src={GoogleIcon} alt="" />;
    }
    return <Icon src={FacebookIcon} alt="" />;
  };

  return (
    <StyledButton
      fullWidth
      onClick={triggerLogin}
      {...props}
      className={channel}
      data-cy={`${channel}-social-login`}
    >
      <div>
        {icon()}
        <StyledBody13 className={channel}>{children}</StyledBody13>
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
