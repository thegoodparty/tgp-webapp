/**
 *
 * LeaderboardWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import PageWrapper from '../../shared/PageWrapper';
import { Body19, H1 } from '../../shared/typogrophy';
import LeaderboardPerson from './LeaderboardPerson';

const ContentWrpper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 20px 48px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 40px 0 64px;
  }
`;

const StyledBody19 = styled(Body19)`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Title = styled.div`
  font-size: 19px;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.gray2};
  font-weight: 700;
  margin: 32px 0 24px;
`;

const Better = styled.div`
  font-size: 13px;
  line-height: 18px;
  text-align: center;
  margin: 24px 0 12px;
`;

const Invite = styled.div`
  font-size: 11px;
  line-height: 15px;
  display: inline-block;
  padding: 13px 17px;
  border-radius: 8px;
  border: solid 2px ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.purple};
  font-weight: 500;
  cursor: pointer;
`;

const Everyone = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.purple};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

const Seperator = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.gray7};
  font-size: 16px;
  font-weight: 400;
  margin: 0 4px;
`;

function LeaderboardWrapper({ crew, user, leaderboard }) {
  return (
    <PageWrapper purple isFullWidth>
      <ContentWrpper>
        <H1>Good Party Leaderboard</H1>
        <StyledBody19>
          Invite Good Party people and move up the leaderboard when they join.
        </StyledBody19>
        <Title>
          Your People <Seperator>|</Seperator>{' '}
          <Link href="#everyone">
            <Everyone>Everyone</Everyone>
          </Link>
        </Title>
        <LeaderboardPerson you person={user} index={0} />
        {crew &&
          crew.map((crewMember, index) => (
            <LeaderboardPerson person={crewMember} index={index + 1} />
          ))}

        <Better>Good Parties are better with friends!</Better>
        <div className="text-center">
          <Link href="?share=true">
            <Invite>INVITE PEOPLE</Invite>
          </Link>
        </div>

        <Title id="everyone">Everyone</Title>
        {leaderboard &&
          leaderboard.map((member, index) => (
            <LeaderboardPerson
              you={member.uuid === user.uuid}
              person={member}
              index={index}
            />
          ))}
      </ContentWrpper>
    </PageWrapper>
  );
}

LeaderboardWrapper.propTypes = {
  crew: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  leaderboard: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  user: PropTypes.object,
};

export default LeaderboardWrapper;
