import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import heartImg from 'images/heart.svg';
import { AmaContainer } from 'containers/shared/AmaContainer';
import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import {
  Body,
  H2,
  Body13,
  H3,
  Body12,
} from 'components/shared/typogrophy/index';
import { fullFirstLastInitials, uuidUrl } from 'helpers/userHelper';
import { numberNth } from 'helpers/numberHelper';
import UserAvatar from 'components/shared/UserAvatar';
import ShareButton from 'components/shared/ShareButton';
import TopQuestions from 'components/shared/TopQuestions';

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

const NoElection = styled(Body13)`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.gray7};
  display: inline-block;
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

const ProfileWrapper = ({
  user,
  crew,
  houseCandidates,
  senateCandidates,
  signoutCallback,
  articles,
}) => {
  let { presidentialRank, senateRank, houseRank } = user;
  const { name, feedback, zipCode, congDistrict } = user;
  const { zip, stateLong, stateShort, primaryCity, cds } = zipCode || {};
  if (typeof presidentialRank === 'string') {
    presidentialRank = JSON.parse(presidentialRank);
  }
  if (typeof senateRank === 'string') {
    senateRank = JSON.parse(senateRank);
  }
  if (typeof houseRank === 'string') {
    houseRank = JSON.parse(houseRank);
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
  const showHouse = houseCandidates && houseCandidates.length > 0;
  const showSenate = senateCandidates && senateCandidates.length > 0;
  let senateRankCount = 0;
  if (senateRank && senateRank[shortState.toLocaleLowerCase()]) {
    senateRankCount = senateRank[shortState.toLocaleLowerCase()].length;
  }
  let houseRankCount = 0;
  if (
    houseRank &&
    houseRank[shortState.toLocaleLowerCase() + userDistrict.code]
  ) {
    houseRankCount =
      houseRank[shortState.toLocaleLowerCase() + userDistrict.code].length;
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
        <H3>
          Your Elections for {shortState}, {zip}
        </H3>
        <Election>
          Presidential:{' '}
          <Link
            to={`/elections/${
              presidentialRank.length > 0
                ? 'ranked-presidential-election'
                : 'presidential'
            }`}
          >
            <ElectionData>
              {presidentialRank
                ? `${presidentialRank.length} Choices Ranked`
                : 'Rank Choices'}
            </ElectionData>
          </Link>
        </Election>
        {stateLong && (
          <Election>
            Senate {stateLong}:
            {showSenate ? (
              <Link
                to={`/elections/${
                  senateRankCount > 0 ? 'ranked-senate-election' : 'senate'
                }/${shortState.toLowerCase()}`}
              >
                <ElectionData>
                  {senateRank
                    ? `${senateRankCount} Choice${
                        senateRankCount > 1 ? 's' : ''
                      } Ranked`
                    : 'Rank Choices'}
                </ElectionData>
              </Link>
            ) : (
              <NoElection>No Race in 2020</NoElection>
            )}
          </Election>
        )}
        {userDistrict.code && (
          <Election>
            House: {numberNth(userDistrict.code)} District ({shortState}-
            {userDistrict.code})
            {showHouse ? (
              <Link
                to={`/elections/${
                  houseRankCount > 0 ? 'ranked-house-election' : 'house'
                }/${shortState.toLowerCase()}/${userDistrict.code}`}
              >
                <ElectionData>
                  {houseRank && houseRankCount > 0
                    ? `${houseRankCount} Choice${
                        houseRankCount > 1 ? 's' : ''
                      } Ranked`
                    : 'Rank Choices'}
                </ElectionData>
              </Link>
            ) : (
              <NoElection>No Race in 2020</NoElection>
            )}
          </Election>
        )}
        <Link to={electionLink}>
          <AllElections>See All Elections</AllElections>
        </Link>

        <H3 style={{ marginTop: '48px', marginBottom: '4px' }}>Your Crew</H3>
        <Body13 style={{ marginBottom: '8px' }}>
          invite people to grow your crew
        </Body13>

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
        <ShareButton
          url={url}
          customElement={
            <UnderCrew>
              <strong>Invite 3 or more friends to join,</strong> and watch how
              quickly The Good Party spreads!
            </UnderCrew>
          }
        />

        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>
          Your Unique Invite Link
        </H3>
        <ShareButton url={url} customElement={<InviteUrl>{url}</InviteUrl>} />

        <H3 style={{ marginTop: '48px', marginBottom: '8px' }}>
          What can you do to help?
        </H3>
        <ShareButton
          url={url}
          customElement={<BottomLink>Invite Friends</BottomLink>}
        />
        <a href="mailto:ask@thegoodparty.org?subject=Feedback%20or%20Suggestion">
          <BottomLink>Give Feedback or Suggestions</BottomLink>
        </a>

        <Body style={{ marginTop: '12px' }}>
          Creators of the World, Unite! help create{' '}
          <img src={heartImg} alt="tpg" /> (Coming Soon)
        </Body>
        <BottomLink
          style={{ marginTop: '48px', marginBottom: '24px' }}
          onClick={signoutCallback}
        >
          Sign Out
        </BottomLink>
        <TopQuestions articles={articles} />
        <AmaContainer />
      </Wrapper>
    </div>
  );
};

ProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  crew: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  signoutCallback: PropTypes.func,
  articles: PropTypes.array,
  houseCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  senateCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ProfileWrapper;
