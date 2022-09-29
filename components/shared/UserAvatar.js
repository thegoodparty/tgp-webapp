import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getInitials } from '/helpers/userHelper';
import { Body14, H1 } from './typogrophy';

const Wrapper = styled(Body14)`
  min-height: 60px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.2);

  &.medium {
    height: 50px;
    width: 50px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      height: 60px;
      width: 60px;
    }
  }

  &.large {
    height: 64px;
    width: 64px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      height: 94px;
      width: 94px;
    }
  }
`;

const UserInitials = styled(Body14)`
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background-color: #000;
  border: solid 1px #999;
  color: #fff;
  text-transform: uppercase;

  &.medium {
    height: 50px;
    width: 50px;
    font-size: 18px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      height: 60px;
      width: 60px;
      font-size: 24px;
    }
  }

  &.large {
    height: 64px;
    width: 64px;
    font-size: 18px;

    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      height: 94px;
      width: 94px;
      font-size: 36px;
      line-height: 42px;
    }
  }
`;

const UserAvatar = ({ user, size = 'small' }) => (
  <>
    {user && (
      <Wrapper>
        {user.avatar ? (
          <Avatar
            className={size}
            style={{
              backgroundImage: `url(${user.avatar.replace(
                'assets.thegoodparty.org',
                'assets.goodparty.org',
              )})`,
            }}
          />
        ) : (
          <UserInitials className={size}>{getInitials(user.name)}</UserInitials>
        )}
      </Wrapper>
    )}
  </>
);

UserAvatar.propTypes = {
  user: PropTypes.object,
  size: PropTypes.string,
};

export default UserAvatar;
