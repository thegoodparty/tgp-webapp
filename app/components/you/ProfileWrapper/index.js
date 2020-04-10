import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { H1, Body, H2, Body13, H3 } from 'components/shared/typogrophy/index';
import {
  fullFirstLastInitials,
  getInitials,
  uuidUrl,
} from 'helpers/userHelper';
import { numberNth } from 'helpers/numberHelper';
import UserAvatar from '../../shared/UserAvatar';

const EditProfile = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  text-align: right;
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
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

const CrewWrapper = styled.div`
  margin-top: 17px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CrewMember = styled(Body13)`
  text-align: center;
`;

const Filler = styled(Body13)`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray9};
  border-radius: 50%;
  border: solid 1px ${({ theme }) => theme.colors.gray9};

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80px;
    width: 80px;
  }
`;

const UnderCrew = styled(Body)`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.blue};
`;
//
const InviteUrl = styled(Body)`
  color: ${({ theme }) => theme.colors.blue};
`;

const ProfileWrapper = ({ user, crew, signoutCallback }) => {
  let { presidentialRank } = user;
  const { name, feedback, zipCode, congDistrict } = user;
  const { zip, stateLong, stateShort, primaryCity, cds } = zipCode || {};
  if (typeof presidentialRank === 'string') {
    presidentialRank = JSON.parse(presidentialRank);
  }
  const shortState = stateShort ? stateShort.toUpperCase() : '';
  let userDistrict = {};
  if (congDistrict && cds && cds.length > 0) {
    cds.forEach(district => {
      if (district.id === congDistrict) {
        userDistrict = district;
      }
    });
    if (!userDistrict.code) {
      userDistrict = cds[0];
    }
  } else if (cds && cds.length > 0) {
    userDistrict = cds[0]; // eslint-disable-line
  }
  let electionLink;
  if (zip) {
    electionLink = `/elections/district/${zip}`;
  } else {
    electionLink = `/intro/zip-finder`;
  }

  const displayCrew = [];
  if (crew && crew.length > 0) {
    crew.forEach((crewMember, index) => {
      if (index < 3) {
        displayCrew.push(crewMember);
      }
    });
  }

  let crewFillers = [];
  if (crew && crew.length < 3) {
    const fillerCount = 3 - crew.length;
    crewFillers = Array.from(
      Array(fillerCount),
      (_, x) => x + 1 + 3 - fillerCount,
    );
  }

  const url = uuidUrl(user);

  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <Link to="/you/edit">
          <EditProfile>Edit Profile</EditProfile>
        </Link>
        <Centered>
          <UserAvatar user={user} size="large" />
          <H2 style={{ marginTop: '30px' }}>{fullFirstLastInitials(name)}</H2>
          {shortState && (
            <Body13 style={{ marginTop: '5px', marginBottom: '9px' }}>
              {primaryCity}, {shortState}-{userDistrict.code}
            </Body13>
          )}
          <Body13>{feedback}</Body13>
        </Centered>
        <H3>Your Elections</H3>
        <Election>
          Presidential:{' '}
          <ElectionData>
            {presidentialRank ? presidentialRank.length : 'No'} Choices Ranked
          </ElectionData>
        </Election>
        {stateLong && (
          <Election>
            Senate: <ElectionData>{stateLong}</ElectionData>
          </Election>
        )}
        {userDistrict.code && (
          <Election>
            House:{' '}
            <ElectionData>
              {numberNth(userDistrict.code)} District ({shortState}-
              {userDistrict.code})
            </ElectionData>
          </Election>
        )}
        <Link to={electionLink}>
          <AllElections>See All Elections</AllElections>
        </Link>

        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>Your Crew</H3>
        <CrewWrapper>
          <CrewMember>
            <UserAvatar user={user} size="medium" />
            <div style={{ marginTop: '10px' }}>You</div>
          </CrewMember>

          {displayCrew.map(crewMember => (
            <CrewMember key={crewMember.uuid}>
              <UserAvatar user={crewMember} size="medium" />
              <div style={{ marginTop: '10px' }}>{crewMember.name}</div>
            </CrewMember>
          ))}
          {crewFillers.map(filler => (
            <Filler key={filler}>{filler}</Filler>
          ))}
        </CrewWrapper>

        <UnderCrew>
          If each person <strong>invites 3 or more people</strong>, we will win!
        </UnderCrew>
        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>
          Your Unique Invite Link
        </H3>
        <InviteUrl>{url}</InviteUrl>

        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>
          What can you do to help?
        </H3>
        <Link to="/you/share">
          <BottomLink>Invite Friends</BottomLink>
        </Link>
        <a href="https://creators.thegodparty.org" target="_blank">
          <BottomLink>Creators of the World, Unite!</BottomLink>
        </a>
        <BottomLink
          style={{ marginTop: '48px', marginBottom: '24px' }}
          onClick={signoutCallback}
        >
          Sign Out
        </BottomLink>
      </Wrapper>
    </div>
  );
};

ProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  crew: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  signoutCallback: PropTypes.func,
};

export default ProfileWrapper;
