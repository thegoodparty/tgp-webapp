import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { H1, Body, H2, Body13, H3 } from 'components/shared/typogrophy/index';
import { fullFirstLastInitials, getInitials } from 'helpers/userHelper';

const Centered = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`;

const UserInitials = styled(H1)`
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
  margin-bottom: 12px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 120px;
    width: 120px;
  }
`;

const Election = styled(Body)`
  margin-top: 8px;
`;

const ElectionData = styled.span`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.blue};
`;

const AllElections = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.blue};
`;

const BottomLink = styled(Body)`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const AccountWrapper = ({ user, signoutCallback }) => {
  let { presidentialRank } = user;
  const { name, feedback } = user;
  if (typeof presidentialRank === 'string') {
    presidentialRank = JSON.parse(presidentialRank);
  }
  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <Centered>
          <UserInitials>{getInitials(name)}</UserInitials>
          <H2>{fullFirstLastInitials(name)}</H2>
          <Body13 style={{ marginTop: '5px', marginBottom: '9px' }}>
            Mendocino, CA-2
          </Body13>
          <Body13>{feedback}</Body13>
        </Centered>
        <H3>Your Elections</H3>
        <Election>
          Presidential:{' '}
          <ElectionData>
            {presidentialRank ? presidentialRank.length : 'No'} Choices Ranked
          </ElectionData>
        </Election>
        <Election>
          House: <ElectionData>California</ElectionData>
        </Election>
        <Election>
          House: <ElectionData>2nd District (CA-2)</ElectionData>
        </Election>
        <AllElections>See All Elections</AllElections>

        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>Your Crew</H3>
        <Body13>
          Coming Soon
          <br />
          We’ll be looking for Good Party Captains to lead their crew to the
          polls when it’s time.
        </Body13>
        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>
          What can you do to help?
        </H3>
        <BottomLink>Invite Friends</BottomLink>
        <BottomLink>Creators of the World, Unite!</BottomLink>
        <BottomLink style={{ marginTop: '48px' }} onClick={signoutCallback}>
          Sign Out
        </BottomLink>
      </Wrapper>
    </div>
  );
};

AccountWrapper.propTypes = {
  user: PropTypes.object,
  signoutCallback: PropTypes.func,
};

export default AccountWrapper;
