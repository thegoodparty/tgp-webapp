import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Body14, Body12 } from '../typogrophy';
import UserAvatar from '../UserAvatar';

const Wrapper = styled.div`
  position: fixed;
  height: 68px;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 10px;
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

const TopLink = styled(Body12)`
  cursor: pointer;
  height: 58px;
  font-size: 1rem;
  border-bottom: solid 2px #fff;
  padding: 0 1rem;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.purple};
  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
  &.button {
    color: white;
    padding: 15px 30px;
    border-radius: 20px;
    background: linear-gradient(
        103.63deg,
        rgba(255, 15, 19, 0.15) -3.51%,
        rgba(191, 0, 32, 0) 94.72%
      ),
      linear-gradient(
        257.82deg,
        rgba(67, 0, 211, 0.25) -11.17%,
        rgba(67, 0, 211, 0) 96.34%
      ),
      linear-gradient(0deg, #5c00c7, #5c00c7), #117cb6;
  }
  &.button:hover {
    border-bottom: solid 2px #fff;
  }
`;

const AvatarWrapper = styled(Body14)`
  height: 58px;
  cursor: pointer;
  margin-left: 2rem;
  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
`;

const LinkContainer = styled.div`
  display: flex;
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
            src="/images/new-logo.svg"
            onClick={() => handleNavigate('/')}
            data-cy="logo"
          />
        </TopLink>
        <LinkContainer>
          {!hideLinks && (
            <>
              <TopLink
                className={partyRoute ? 'showBorder' : ''}
                onClick={() => handleNavigate('/party')}
                data-cy="party"
              >
                CANDIDATES
              </TopLink>
              <TopLink
                className={partyRoute ? 'showBorder' : ''}
                onClick={() => handleNavigate('/party')}
                data-cy="party"
              >
                ABOUT
              </TopLink>
              {/* <TopLink
                className={electionRoute ? 'showBorder' : ''}
                onClick={() => handleNavigate('/elections')}
                data-cy="elections"
              >
                ELECTIONS 
            </TopLink> */}
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
                <>
                  <TopLink
                    onClick={() => handleNavigate('/you?register=true')}
                    data-cy="you"
                    className="button"
                  >
                    SIGN UP
                  </TopLink>
                  <TopLink
                    className={youRoute ? 'showBorder' : ''}
                    onClick={() => handleNavigate('/login')}
                    data-cy="you"
                  >
                    LOG IN
                  </TopLink>
                </>
              )}
            </>
          )}
        </LinkContainer>
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
