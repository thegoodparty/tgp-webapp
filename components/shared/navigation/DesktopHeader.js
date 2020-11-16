import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Body14, Body9 } from '../typogrophy';
import UserAvatar from '../UserAvatar';

const Wrapper = styled.div`
  position: fixed;
  height: 58px;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 58px;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;
`;

const TopLink = styled(Body9)`
  cursor: pointer;
  height: 58px;
  border-bottom: solid 2px #fff;
  padding: 0 1rem;
  display: flex;
  align-items: center;

  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
`;

const AvatarWrapper = styled(Body14)`
  height: 58px;
  cursor: pointer;

  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
`;

const DesktopHeader = ({ pathname, user, navigateCallback }) => {
  const youRoute = !electionRoute && pathname?.includes('you');
  const electionRoute = pathname?.includes('elections');
  const partyRoute = !electionRoute && pathname?.includes('party');
  const hideLinks = pathname?.includes('zip-finder');

  const handleNavigate = screen => {
    navigateCallback(screen, user);
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <TopLink>
          <Logo
            src="images/logo-caps.svg"
            onClick={() => handleNavigate('/home')}
            data-cy="logo"
          />
        </TopLink>
        {!hideLinks && (
          <>
            <TopLink
              className={partyRoute ? 'showBorder' : ''}
              onClick={() => handleNavigate('/party')}
              data-cy="party"
            >
              ABOUT
            </TopLink>
            <TopLink
              className={electionRoute ? 'showBorder' : ''}
              onClick={() => handleNavigate('/elections')}
              data-cy="elections"
            >
              ELECTIONS
            </TopLink>
            {user && user.name ? (
              <AvatarWrapper
                className={youRoute ? 'showBorder' : ''}
                onClick={() => handleNavigate('/you')}
              >
                <UserAvatar
                  user={user}
                  onClick={() => handleNavigate('/you')}
                />
              </AvatarWrapper>
            ) : (
              <TopLink
                className={youRoute ? 'showBorder' : ''}
                onClick={() => handleNavigate('/you')}
                data-cy="you"
              >
                YOU
              </TopLink>
            )}
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

DesktopHeader.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  navigateCallback: PropTypes.func,
};

export default DesktopHeader;
