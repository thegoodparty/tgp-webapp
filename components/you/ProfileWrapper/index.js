import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PageWrapper from 'components/shared/PageWrapper';
import heartImg from 'public/images/heart.svg';
import { AmaContainer } from 'containers/shared/AmaContainer';
import { Body, H2, Body13, H3 } from 'components/shared/typogrophy/index';
import {
  fullFirstLastInitials,
  uuidUrl,
  getUserDistrict,
} from 'helpers/userHelper';
import { numberNth } from 'helpers/numberHelper';
import UserAvatar from 'components/shared/UserAvatar';
import ShareButton from 'components/shared/ShareButton';
import TopQuestions from 'components/shared/TopQuestions';
import CrewMember from 'components/you/CrewMember';
import {
  houseElectionLink,
  presidentialElectionLink,
  senateElectionLink,
  getElectionLink,
} from 'helpers/electionsHelper';
import ChangePasswordModal from './ChangePasswordModal';
import ShareModal from './ShareModal/Loadable';
import VerifyEmailBanner from './VerifyEmailBanner';

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
  crewPreview,
  crewCount,
  houseCandidatesCount,
  senateCandidatesCount,
  signoutCallback,
  articles,
  rankingObj,
  changePasswordCallback,
  verifyEmailCallback,
}) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const onCloseShareModal = () => {
    setShowShareModal(false);
  };
  const onClickShareButton = () => {
    setShowShareModal(true);
  };
  const presidentialRank = rankingObj.presidential;
  const senateRank = rankingObj.presidential;
  const houseRank = rankingObj.house;

  const { name, feedback, zipCode, congDistrict, hasPassword } = user;
  const { zip, stateLong, stateShort, primaryCity, cds } = zipCode || {};

  const shortState = stateShort ? stateShort.toUpperCase() : '';
  const userDistrict = getUserDistrict(congDistrict, cds);
  const electionLink = getElectionLink(zip);

  let crewFillers = [];
  if (crewPreview && crewPreview.length < 3) {
    const fillerCount = 3 - crewPreview.length;
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
    <PageWrapper
      white
      topBanner={
        <VerifyEmailBanner
          user={user}
          verifyEmailCallback={verifyEmailCallback}
        />
      }
    >
      <Link href="/you/edit" data-cy="edit-profile-link">
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
          href={presidentialElectionLink()}
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
              href={senateElectionLink(shortState)}
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
            <NoElection>No Race in 2020</NoElection>
          )}
        </Election>
      )}
      {userDistrict.code && (
        <Election data-cy="house-election">
          House: {numberNth(userDistrict.code)} District ({shortState}-
          {userDistrict.code})
          {showHouse ? (
            <Link
              href={houseElectionLink(shortState, userDistrict.code)}
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
            <NoElection>No Race in 2020</NoElection>
          )}
        </Election>
      )}
      <Link href={electionLink} data-cy="all-election-link">
        <AllElections>See All Elections</AllElections>
      </Link>
      <Link href="verify-vote" data-cy="verify-vote-link">
        <AllElections>Check Voter Registration</AllElections>
      </Link>
      <CrewTitle data-cy="crew-title">
        <H3 style={{ marginRight: '6px' }}>Your Crew </H3>
        <Body>
          (<img src={heartImg} alt="tpg" /> people recruited)
        </Body>
      </CrewTitle>
      <Body13 style={{ marginBottom: '8px' }} data-cy="invite-crew-label">
        invite people to grow your crew
      </Body13>

      <CrewWrapper>
        <Link href="you/crew">
          <CrewMember
            crewMember={user}
            overrideName="You"
            overrideCount={crewCount}
          />
        </Link>

        {crewPreview &&
          crewPreview.map((crewMember, index) => (
            <React.Fragment key={crewMember.uuid}>
              {crewCount > 3 && index === 2 ? (
                <div>
                  <More>+{crewCount - 2}</More>

                  <Body13 className="text-center" style={{ marginTop: '4px' }}>
                    <Link href="you/crew">SEE ALL</Link>
                  </Body13>
                </div>
              ) : (
                <Link href="you/crew">
                  <CrewMember crewMember={crewMember} />
                </Link>
              )}
            </React.Fragment>
          ))}
        {crewFillers.map(filler => (
          <Link href="you/crew" key={filler}>
            <Filler data-cy="crew-filler">{filler}</Filler>
          </Link>
        ))}
      </CrewWrapper>
      <Body style={{ marginTop: '10px' }}>
        <Link href="you/crew" data-cy="leaderboards-link">
          View Leaderboards
        </Link>
      </Body>

      <UnderCrew data-cy="under-crew" onClick={onClickShareButton}>
        <strong>Invite 3 or more friends to join,</strong> and watch how quickly
        The Good Party spreads!
      </UnderCrew>

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
      <BottomLink data-cy="spread-word" onClick={onClickShareButton}>
        Spread the word
      </BottomLink>
      <a
        href="mailto:ask@thegoodparty.org?subject=Feedback%20or%20Suggestion"
        data-cy="feedback-link"
      >
        <BottomLink>Give Feedback or Suggestions</BottomLink>
      </a>
      <Link href="/creators" data-cy="creators-link">
        <BottomLink>Creators of the World, Unite!</BottomLink>
      </Link>
      <BottomLink
        style={{ marginTop: '48px' }}
        onClick={() => setShowPasswordModal(true)}
        data-cy="change-password-link"
      >
        {hasPassword ? 'Change Password' : 'Add Password'}
      </BottomLink>
      <BottomLink
        style={{ marginBottom: '24px' }}
        onClick={signoutCallback}
        data-cy="signout-link"
      >
        Sign Out
      </BottomLink>
      <TopQuestions articles={articles} />
      <AmaContainer />
      {showPasswordModal && (
        <ChangePasswordModal
          closeModalCallback={() => setShowPasswordModal(false)}
          changePasswordCallback={changePasswordCallback}
          hasPassword={hasPassword}
        />
      )}
      {showShareModal && (
        <ShareModal
          open={showShareModal}
          closeCallback={onCloseShareModal}
          user={user}
        />
      )}
    </PageWrapper>
  );
};

ProfileWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  crew: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  crewPreview: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  crewCount: PropTypes.number,
  signoutCallback: PropTypes.func,
  articles: PropTypes.array,
  houseCandidatesCount: PropTypes.number,
  senateCandidatesCount: PropTypes.number,
  senateCandidates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rankingObj: PropTypes.object,
  changePasswordCallback: PropTypes.func,
  verifyEmailCallback: PropTypes.func,
};

export default ProfileWrapper;
