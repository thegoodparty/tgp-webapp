import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PageWrapper from 'components/shared/PageWrapper';
import heartImg from 'images/heart.svg';
import { AmaContainer } from 'containers/shared/AmaContainer';
import { Body, H2, Body13, H3 } from 'components/shared/typogrophy/index';
import { fullFirstLastInitials, uuidUrl } from 'helpers/userHelper';
import { numberNth } from 'helpers/numberHelper';
import UserAvatar from 'components/shared/UserAvatar';
import ShareButton from 'components/shared/ShareButton';
import TopQuestions from 'components/shared/TopQuestions';
import CrewMember from 'components/you/CrewMember';
import {
  houseElectionLink,
  presidentialElectionLink,
  senateElectionLink,
} from 'helpers/electionsHelper';

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

const AllElections = styled(Body)`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.blue};
`;

const BottomLink = styled(Body)`
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

const CrewTitle = styled(Body)`
  margin-top: 48px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const CrewWrapper = styled.div`
  margin-top: 17px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const InviteUrl = styled(Body)`
  color: ${({ theme }) => theme.colors.blue};
`;

const More = styled(Body13)`
  background-color: #fff;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue};
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.07), 0px 0px 12px rgba(0, 0, 0, 0.08),
    0px 0px 16px rgba(0, 0, 0, 0.12);
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80px;
    width: 80px;
  }
`;

const ProfileWrapper = ({
  user,
  crew,
  houseCandidatesCount,
  senateCandidatesCount,
  signoutCallback,
  articles,
  rankingObj,
}) => {
  const presidentialRank = rankingObj.presidential;
  const senateRank = rankingObj.presidential;
  const houseRank = rankingObj.house;

  const { name, feedback, zipCode, congDistrict } = user;
  const { zip, stateLong, stateShort, primaryCity, cds } = zipCode || {};

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
  const showHouse = houseCandidatesCount > 0;
  const showSenate = senateCandidatesCount > 0;

  const presidentialRankCount = Object.keys(presidentialRank).length;
  const senateRankCount = Object.keys(senateRank).length;
  const houseRankCount = Object.keys(houseRank).length;

  const url = uuidUrl(user);

  return (
    <PageWrapper white>
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
        <Link to={presidentialElectionLink()}>
          <ElectionData>
            {presidentialRankCount === 0
              ? 'Rank Choices'
              : `${presidentialRankCount} Choice${
              presidentialRankCount === 1 ? '' : 's'
              } Ranked`}
          </ElectionData>
        </Link>
      </Election>
      {stateLong && (
        <Election>
          Senate {stateLong}:
          {showSenate ? (
            <Link to={senateElectionLink(shortState)}>
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
            <Link to={houseElectionLink(shortState, userDistrict.code)}>
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
      <CrewTitle>
        <H3 style={{ marginRight: '6px' }}>Your Crew </H3>
        <Body>
          (<img src={heartImg} alt="tpg" /> people recruited)
        </Body>
      </CrewTitle>
      <Body13 style={{ marginBottom: '8px' }}>
        invite people to grow your crew
      </Body13>

      <CrewWrapper>
        <CrewMember
          crewMember={user}
          overrideName="You"
          overrideCount={displayCrew.length}
        />

        {displayCrew.map((crewMember, index) => (
          <>
            {crew.length > 3 && index === 2 ? (
              <div>
                <More>+{crew.length - 2}</More>

                <Body13 className="text-center" style={{ marginTop: '4px' }}>
                  <Link to="you/crew">SEE ALL</Link>
                </Body13>
              </div>
            ) : (
                <CrewMember crewMember={crewMember} />
              )}
          </>
        ))}
        {crewFillers.map(filler => (
          <Filler key={filler}>{filler}</Filler>
        ))}
      </CrewWrapper>
      <Body style={{ marginTop: '10px' }}>
        <Link to="you/crew/leaderboard">View Leaderboards</Link>
      </Body>
      <ShareButton
        url={`Check out The Good Party.  See what's possible, before you vote. \n ${url}`}
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
      <BottomLink>Spread the world</BottomLink>
      <ShareButton
        url={`Check out voting blocs on The Good Party.   See what's possible, before you vote. \n ${url}`}
        customElement={<BottomLink>Invite some friends</BottomLink>}
      />
      <a href=" http://crowdcast.thegoodparty.org" target="_blank">
        <BottomLink>Add a share link to our crowdcast </BottomLink>
      </a>
      <a href="mailto:ask@thegoodparty.org?subject=Feedback%20or%20Suggestion">
        <BottomLink>Give Feedback or Suggestions</BottomLink>
      </a>
      <Link to="/creators">
        <BottomLink>
          Creators of the World, Unite! help create{' '}
          <img src={heartImg} alt="tpg" />
        </BottomLink>
      </Link>
      <BottomLink
        style={{ marginTop: '48px', marginBottom: '24px' }}
        onClick={signoutCallback}
      >
        Sign Out
      </BottomLink>
      <TopQuestions articles={articles} />
      <AmaContainer />
    </PageWrapper>
  );
};

ProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  crew: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  signoutCallback: PropTypes.func,
  articles: PropTypes.array,
  houseCandidatesCount: PropTypes.number,
  senateCandidatesCount: PropTypes.number,
  senateCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rankingObj: PropTypes.object,
};

export default ProfileWrapper;
