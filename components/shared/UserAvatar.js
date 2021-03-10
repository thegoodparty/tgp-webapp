import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getInitials } from 'helpers/userHelper';
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

  &.medium {
    height: 50px;
    width: 50px;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 60px;
      width: 60px;
    }
  }

  &.large {
    height: 62px;
    width: 62px;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 96px;
      width: 96px;
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
  background-color: ${({ theme }) => theme.colors.purple4};
  border: solid 1px ${({ theme }) => theme.colors.purple};
  text-transform: uppercase;

  &.medium {
    height: 50px;
    width: 50px;
    font-size: 18px;

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 60px;
      width: 60px;
      font-size: 24px;
    }
  }
`;

const LargeUserInitials = styled(H1)`
  cursor: pointer;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.purple4};
  text-transform: uppercase;
  border: solid 2px ${({ theme }) => theme.colors.purple};

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 120px;
    width: 120px;
  }
`;

const UserAvatar = ({ user, size = 'small' }) => (
  <>
    {user && (
      <Wrapper>
        {user.avatar ? (
          <Avatar
            className={size}
            style={{ backgroundImage: `url(${user.avatar})` }}
          />
        ) : (
          <>
            {size === 'small' || size === 'medium' ? (
              <UserInitials className={size}>
                {getInitials(user.name)}
              </UserInitials>
            ) : (
              <LargeUserInitials>{getInitials(user.name)}</LargeUserInitials>
            )}
          </>
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
