/**
 *
 * CrewWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageWrapper from 'components/shared/PageWrapper';
import {
  H1,
  Body,
  Body13,
  Body11,
  Body9,
  H3,
} from 'components/shared/typogrophy/index';
import { OutlinedButton } from 'components/shared/buttons';
import CrewMember from '../CrewMember';
import ShareModal from '../ProfileWrapper/ShareModal/Loadable';

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  margin: 0 6px;
  font-size: 20px;
`;

const RankedCrewWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  padding: 4px 0;

  &.highlighted {
    background-color: ${({ theme }) => theme.colors.grayBg};
  }
`;

const Rank = styled(Body9)`
  padding-bottom: 45px;
  margin-right: 12px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 22px;
  }
`;

const TextWrapper = styled(Body11)`
  padding-bottom: 45px;
  margin-left: 12px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 22px;
  }
`;

const NameLocation = styled.div`
  display: flex;
  align-items: baseline;
`;

const Name = styled(Body13)`
  font-weight: 500;
  margin-right: 5px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 10px;
  }
`;
const ShareWrapper = styled.div`
  margin: 2rem 0;
  text-align: center;
  padding-bottom: 1.5rem;
`;
function CrewWrapper({ crew, tab = 'crew', loading, user }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const onCloseShareModal = () => {
    setShowShareModal(false);
  };
  const onClickShareButton = () => {
    setShowShareModal(true);
  };
  return (
    <PageWrapper white>
      <H1 data-cy="title">Good Party Leaders</H1>
      <Body
        style={{ marginTop: '15px', marginBottom: '24px' }}
        data-cy="description"
      >
        See where you rank in recruiting people to The Good Party. Invite more
        people to improve your rank!
      </Body>

      {tab === 'crew' ? (
        <TabWrapper>
          <H3 data-cy="your-crew">Your Crew</H3>
          <Separator>|</Separator>
          <Body>
            <Link data-cy="overall-crew" href="/you/crew/leaderboard">
              See Overall Leaderboard
            </Link>
          </Body>
        </TabWrapper>
      ) : (
        <TabWrapper>
          <H3 data-cy="overall-crew">Overall Leaderboard</H3>
          <Separator>|</Separator>
          <Body>
            <Link data-cy="your-crew" href="/you/crew">
              See your Crew
            </Link>
          </Body>
        </TabWrapper>
      )}

      {!loading && crew ? (
        <>
          {tab === 'crew' && (
            <RankedCrewWrapper>
              <Rank data-cy="you-rank">1</Rank>
              <CrewMember
                crewMember={user}
                overrideCount={user.crewCount}
                showName={false}
              />
              <TextWrapper>
                <NameLocation>
                  <Name data-cy="you-crew-name">YOU</Name>

                  <Body11 data-cy="you-location">
                    {user.zipCode?.primaryCity &&
                      `${user.zipCode.primaryCity}, `}
                    {user.shortState ? user.shortState.toUpperCase() : ''}
                    {user.districtNumber && `-${user.districtNumber}`}
                  </Body11>
                </NameLocation>
                {user.feedback && (
                  <Body11 data-cy="you-feedback">"{user.feedback}"</Body11>
                )}
              </TextWrapper>
            </RankedCrewWrapper>
          )}
          {crew.map((crewMember, index) => (
            <RankedCrewWrapper
              key={crewMember.uuid}
              className={
                tab === 'leaderboard' && crewMember.uuid === user.uuid
                  ? 'highlighted'
                  : ''
              }
              data-cy="crew-row"
            >
              <Rank data-cy="crew-rank">
                {tab === 'leaderboard' ? index + 1 : index + 2}
              </Rank>
              <CrewMember crewMember={crewMember} showName={false} />
              <TextWrapper>
                <NameLocation>
                  <Name data-cy="crew-member-name">{crewMember.name}</Name>

                  <Body11 data-cy="crew-location">
                    {crewMember.city && `${crewMember.city}, `}
                    {crewMember.shortState
                      ? crewMember.shortState.toUpperCase()
                      : ''}
                    {crewMember.districtNumber &&
                      `-${crewMember.districtNumber}`}
                    {tab === 'leaderboard' && crewMember.uuid === user.uuid && (
                      <> (YOU)</>
                    )}
                  </Body11>
                </NameLocation>
                {crewMember.feedback && (
                  <Body11 data-cy="crew-feedback">
                    "{crewMember.feedback}"
                  </Body11>
                )}
              </TextWrapper>
            </RankedCrewWrapper>
          ))}
          <ShareWrapper>
            <Body>Want to see people show up here?</Body>
            <OutlinedButton
              active
              style={{ marginTop: '1.5rem' }}
              onClick={onClickShareButton}
            >
              INVITE PEOPLE
            </OutlinedButton>
            {showShareModal && (
              <ShareModal
                open={showShareModal}
                closeCallback={onCloseShareModal}
                user={user}
              />
            )}
          </ShareWrapper>
        </>
      ) : (
        <>
          <div className="text-center" style={{ marginTop: '150px' }}>
            <CircularProgress />
          </div>
        </>
      )}
    </PageWrapper>
  );
}

CrewWrapper.propTypes = {
  crew: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  tab: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default CrewWrapper;
