/**
 *
 * PeopleSection
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TiPlus } from 'react-icons/ti';
import Link from 'next/link';

import { Body13, Body19, Body9, H1 } from '../../shared/typogrophy';
import { GrayText } from './index';
import CrewMember from './CrewMember';

const AvatarsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
`;

const CircleWrapper = styled(Body9)`
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-right: 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 24px;
  }
`;

const DashedCircle = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 9px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 94px;
    height: 94px;
    margin-bottom: 12px;
  }
`;

const CircleWithBevel = styled.div`
  background-color: ${({ theme }) => theme.colors.purple3};
  color: ${({ theme }) => theme.colors.purple};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 9px;
  box-shadow: -9px 9px 15px rgba(224, 212, 234, 0.2),
    9px -9px 15px rgba(224, 212, 234, 0.2),
    -9px -9px 15px rgba(255, 255, 255, 0.9),
    9px 9px 15px rgba(224, 212, 234, 0.9),
    inset 1px 1px 2px rgba(255, 255, 255, 0.3),
    inset -1px -1px 2px rgba(224, 212, 234, 0.5);

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 94px;
    height: 94px;
    margin-bottom: 12px;
    box-shadow: -13.0982px 13.0982px 21.8304px rgba(224, 212, 234, 0.2),
      13.0982px -13.0982px 21.8304px rgba(224, 212, 234, 0.2),
      -13.0982px -13.0982px 21.8304px rgba(255, 255, 255, 0.9),
      13.0982px 13.0982px 21.8304px rgba(224, 212, 234, 0.9),
      inset 1.45536px 1.45536px 2.91071px rgba(255, 255, 255, 0.3),
      inset -1.45536px -1.45536px 2.91071px rgba(224, 212, 234, 0.5);
  }
`;

const LeaderboardLink = styled(Body19)`
  color: ${({ theme }) => theme.colors.purple};
  margin-top: 18px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 24px;
  }
`;

const Wrapper = styled.section``;

function PeopleSection({ user, crewPreview, crewCount }) {
  const [crewFillers, setCrewFillers] = useState([]);
  const circlesCount = 2;
  useEffect(() => {
    if (crewPreview && crewPreview.length < circlesCount) {
      const fillerCount = circlesCount - crewPreview.length;
      const newFillers = Array.from(
        Array(fillerCount),
        (_, x) => x + 1 + circlesCount - fillerCount,
      );
      setCrewFillers(newFillers);
    }
  }, [crewPreview]);

  console.log('crewFillers', crewFillers);

  return (
    <Wrapper>
      <Body19>
        <strong>Your People</strong>
        <br />
        <GrayText>
          Share your unique link to move up the leaderboard
        </GrayText>{' '}
      </Body19>

      <AvatarsWrapper>
        <CircleWrapper>
          <Link href="?share=true" passHref>
            <a>
              <CircleWithBevel className="flex-center">
                <TiPlus size={20} />
              </CircleWithBevel>
              INVITE
            </a>
          </Link>
        </CircleWrapper>
        {crewPreview.map((crewMember, index) => (
          <React.Fragment key={crewMember.uuid}>
            {crewCount > 2 && index === 2 ? (
              <CircleWrapper>
                <Link href="/profile/leaderboard" passHref>
                  <a>
                    <CircleWithBevel className="flex-center">
                      <TiPlus size={20} />
                      {crewCount - 2}
                    </CircleWithBevel>
                    MORE
                  </a>
                </Link>
              </CircleWrapper>
            ) : (
              <Link href="/profile/leaderboard" passHref>
                <a>
                  <CircleWrapper key={crewMember.uuid}>
                    <CrewMember crewMember={crewMember} />
                  </CircleWrapper>
                </a>
              </Link>
            )}
          </React.Fragment>
        ))}
        {crewFillers.map(filler => (
          <CircleWrapper key={filler}>
            <DashedCircle src="/images/icons/dashed-circle.svg" />
          </CircleWrapper>
        ))}
      </AvatarsWrapper>
      <Link href="/profile/leaderboard" passHref>
        <a>
          <LeaderboardLink>View Leaderboard</LeaderboardLink>
        </a>
      </Link>
    </Wrapper>
  );
}

PeopleSection.propTypes = {
  user: PropTypes.object,
  crewPreview: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  crewCount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

export default PeopleSection;
