import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getInitials } from 'helpers/userHelper';
import { Body14, H1 } from './typogrophy';

const Wrapper = styled(Body14)`
  min-height: 58px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;

  &.large {
    height: 80px;
    width: 80px;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 120px;
      width: 120px;
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
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  text-transform: uppercase;
`;

const LargeUserInitials = styled(H1)`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  text-transform: uppercase;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 120px;
    width: 120px;
  }
`;

const UserAvatar = ({ user, size = 'small' }) => {
  return (
    <>
      {user && (
        <Wrapper>
          {user.avatar ? (
            <Avatar src={user.avatar} className={size} />
          ) : (
            <>
              {size === 'small' ? (
                <UserInitials>{getInitials(user.name)}</UserInitials>
              ) : (
                <LargeUserInitials>{getInitials(user.name)}</LargeUserInitials>
              )}
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

UserAvatar.propTypes = {
  user: PropTypes.object,
};

export default UserAvatar;
