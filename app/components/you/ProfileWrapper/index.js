import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PageWrapper from 'components/shared/PageWrapper';
import heartImg from 'images/heart.svg';
import { AmaContainer } from 'containers/shared/AmaContainer';
import { Body, H2, Body13, H3 } from 'components/shared/typogrophy/index';
import {
  fullFirstLastInitials,
  uuidUrl,
  getUserDistrict,
  getDisplayCrew,
  getCrewFillers,
} from 'helpers/userHelper';
import { numberNth } from 'helpers/numberHelper';
import UserAvatar from 'components/shared/UserAvatar';
import ShareButton from 'components/shared/ShareButton';
import TopQuestions from 'components/shared/TopQuestions';
import {
  houseElectionLink,
  presidentialElectionLink,
  senateElectionLink,
  getElectionLink,
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
  const userDistrict = getUserDistrict(congDistrict, cds);
  const electionLink = getElectionLink(zip);

  const displayCrew = getDisplayCrew(crew);

  const crewFillers = getCrewFillers(crew);
  const showHouse = houseCandidatesCount > 0;
  const showSenate = senateCandidatesCount > 0;

  const presidentialRankCount = Object.keys(presidentialRank).length;
  const senateRankCount = Object.keys(senateRank).length;
  const houseRankCount = Object.keys(houseRank).length;

  const url = uuidUrl(user);

  return (
    <PageWrapper white>
      <Link to="/you/edit" data-cy="edit-profile-link">
        <EditProfile>Edit Profile</EditProfile>
      </Link>
      <Centered>
        <UserAvatar user={user} size="large" />
        <H2 style={{ marginTop: '30px' }} data-cy="profile-name">
          {fullFirstLastInitials(name)}
        </H2>
        {shortState && (
          <Body13
            style={{ marginTop: '5px', marginBottom: '9px' }}
            data-cy="city"
          >
            {primaryCity}, {shortState}-{userDistrict.code}
          </Body13>
        )}
        <Body13 data-cy="feedback">{feedback}</Body13>
      </Centered>
      <H3 data-cy="location">
        Your Elections for {shortState}, {zip}
      </H3>
      <Election data-cy="presidential-election">
        Presidential:{' '}
        <Link
          to={presidentialElectionLink()}
          data-cy="presidential-election-link"
        >
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
        <Election data-cy="senate-election">
          Senate {stateLong}:
          {showSenate ? (
            <Link
              to={senateElectionLink(shortState)}
              data-cy="senate-election-link"
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
            <NoElection data-cy="no-senate-race">No Race in 2020</NoElection>
          )}
        </Election>
      )}
      {userDistrict.code && (
        <Election data-cy="house-election">
          House: {numberNth(userDistrict.code)} District ({shortState}-
          {userDistrict.code})
          {showHouse ? (
            <Link
              to={houseElectionLink(shortState, userDistrict.code)}
              data-cy="house-election-link"
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
            <NoElection data-cy="no-house-race">No Race in 2020</NoElection>
          )}
        </Election>
      )}
      <Link to={electionLink} data-cy="all-election-link">
        <AllElections>See All Elections</AllElections>
      </Link>

      <H3
        style={{ marginTop: '48px', marginBottom: '4px' }}
        data-cy="crew-title"
      >
        Your Crew
      </H3>
      <Body13 style={{ marginBottom: '8px' }} data-cy="invite-crew-label">
        invite people to grow your crew
      </Body13>

      <CrewWrapper>
        <CrewMember data-cy="crew-member-title">
          <UserAvatar user={user} size="medium" />
          <div style={{ marginTop: '10px' }}>You</div>
        </CrewMember>

        {displayCrew.map(crewMember => (
          <CrewMember key={crewMember.uuid} data-cy="crew-member">
            <UserAvatar user={crewMember} size="medium" />
            <div style={{ marginTop: '10px' }}>{crewMember.name}</div>
          </CrewMember>
        ))}
        {crewFillers.map(filler => (
          <Filler key={filler} data-cy="crew-filler">
            {filler}
          </Filler>
        ))}
      </CrewWrapper>
      <ShareButton
        url={url}
        customElement={
          <UnderCrew data-cy="under-crew">
            <strong>Invite 3 or more friends to join,</strong> and watch how
            quickly The Good Party spreads!
          </UnderCrew>
        }
      />

      <H3
        style={{ marginTop: '48px', marginBottom: '8px' }}
        data-cy="invite-link-label"
      >
        Your Unique Invite Link
      </H3>
      <ShareButton
        url={url}
        customElement={<InviteUrl data-cy="invite-url">{url}</InviteUrl>}
      />

      <H3
        style={{ marginTop: '48px', marginBottom: '8px' }}
        data-cy="help-title"
      >
        What can you do to help?
      </H3>
      <ShareButton
        url={url}
        customElement={
          <BottomLink data-cy="friend-invite">Invite Friends</BottomLink>
        }
      />
      <a
        href="mailto:ask@thegoodparty.org?subject=Feedback%20or%20Suggestion"
        data-cy="feedback-link"
      >
        <BottomLink>Give Feedback or Suggestions</BottomLink>
      </a>
      <Link to="/creators" data-cy="creators-link">
        <BottomLink>
          Creators of the World, Unite! help create{' '}
          <img src={heartImg} alt="tpg" />
        </BottomLink>
      </Link>
      <BottomLink
        style={{ marginTop: '48px', marginBottom: '24px' }}
        onClick={signoutCallback}
        data-cy="signout-link"
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
