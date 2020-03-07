import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getInitials } from 'helpers/userHelper';
import LogoCaps from 'images/logo-caps.svg';
import { Body14, Body9 } from '../typogrophy';

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
  margin-left: 16px;
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

const InitialWrapper = styled(Body14)`
  height: 58px;
  display: flex;
  align-items: center;

  &:hover,
  &.showBorder {
    border-bottom: solid 2px ${({ theme }) => theme.colors.lightBlue};
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

const DesktopHeader = ({ pathname, user }) => {
  const youRoute = !electionRoute && pathname.includes('you');
  const electionRoute = pathname.includes('elections');
  // const partyRoute = !electionRoute && pathname.includes('party');
  const hideLinks = pathname.includes('zip-finder');

  return (
    <Wrapper>
      <ContentWrapper>
        <Link to="/party">
          <Logo src={LogoCaps} />
        </Link>
        {!hideLinks && (
          <>
            <Link to="/">
              <TopLink className={electionRoute ? 'showBorder' : ''}>
                ELECTIONS
              </TopLink>
            </Link>
            <Link to="/you">
              {user && user.name ? (
                <InitialWrapper className={youRoute ? 'showBorder' : ''}>
                  <UserInitials>{getInitials(user.name)}</UserInitials>
                </InitialWrapper>
              ) : (
                <TopLink className={youRoute ? 'showBorder' : ''}>YOU</TopLink>
              )}
            </Link>
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

DesktopHeader.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default DesktopHeader;
