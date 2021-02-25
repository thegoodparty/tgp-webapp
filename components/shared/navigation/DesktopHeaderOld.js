import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styled from 'styled-components';
import { Body14, Body12 } from '../typogrophy';
import UserAvatar from '../UserAvatar';

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;
`;
const Divider = styled.div`
  height: 60px;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.grayE};
`;
const TopLink = styled(Body12)`
  cursor: pointer;
  height: 60px;
  font-size: 1rem;
  border-bottom: solid 2px #fff;
  padding: 0 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.purple};
  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
  &.button {
    height: 36px;
    color: white;
    margin: 0.75rem 0 0.75rem 1.5rem;
    padding: 15px 30px;
    border-radius: 8px;
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
  height: 60px;
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
  }
`;

const LinkContainer = styled.div`
  display: flex;
`;
const DesktopHeader = ({ pathname, user }) => {
  const youRoute = !electionRoute && pathname?.includes('you');
  const electionRoute = pathname?.includes('elections');
  const partyRoute = !electionRoute && pathname?.includes('party');
  const hideLinks = pathname?.includes('zip-finder');

  return (
    <Wrapper>
      <ContentWrapper>
        <TopLink>
          <Link href="/" passHref>
            <a>
              <Logo
                src="/images/new-logo.svg"
                // onClick={() => handleNavigate('/')}
                data-cy="logo"
              />
            </a>
          </Link>
        </TopLink>
        <LinkContainer>
          {!hideLinks && (
            <>
              <Link href="/party" passHref>
                <a>
                  <TopLink
                    className={partyRoute ? 'showBorder' : ''}
                    data-cy="party"
                  >
                    CANDIDATES
                  </TopLink>
                </a>
              </Link>
              <Divider />
              <Link href="/party" passHref>
                <a>
                  <TopLink
                    className={partyRoute ? 'showBorder' : ''}
                    data-cy="party"
                  >
                    ABOUT
                  </TopLink>
                </a>
              </Link>
              {user?.name ? (
                <Link href="/you" passHref>
                  <a>
                    <AvatarWrapper className={youRoute ? 'showBorder' : ''}>
                      <UserAvatar user={user} />
                    </AvatarWrapper>
                  </a>
                </Link>
              ) : (
                <>
                  <Divider />
                  <Link href="?register=true" passHref>
                    <a>
                      <TopLink data-cy="you" className="button">
                        SIGN UP
                      </TopLink>
                    </a>
                  </Link>
                  <Link href="/login" passHref>
                    <a>
                      <TopLink
                        className={youRoute ? 'showBorder' : ''}
                        data-cy="you"
                      >
                        LOG IN
                      </TopLink>
                    </a>
                  </Link>
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
