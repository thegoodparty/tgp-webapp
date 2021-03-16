/**
 *
 * LeaderboardPerson
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';

import { numberFormatter } from 'helpers/numberHelper';
import UserAvatar from '../../shared/UserAvatar';
import { fullFirstLastInitials } from '../../../helpers/userHelper';

const heartImg = '/images/heart.svg';

const Row = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${({ theme }) => theme.colors.purple4};
  &.purple-bg {
    background-color: #e5dbed;
    border-bottom: none;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

const Index = styled.div`
  font-size: 11px;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Name = styled.div`
  font-size: 16px;
  margin-left: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray2};
`;

const CrewCountWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  line-height: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray4};
  margin-top: 6px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0;
  }
`;

const Heart = styled.img`
  display: inline-block;
  width: 14px;
  height: auto;
  margin-right: 6px;
`;

function LeaderboardPerson({ you = false, person, index }) {
  if (!person) {
    return <></>;
  }

  const { name, uuid, crewCount } = person;
  return (
    <Row className={you && 'purple-bg'} key={uuid}>
      <LeftColumn>
        <Index>{index + 1}</Index>
        <UserAvatar user={person} size="medium" you />
        <Name>
          {you ? `${fullFirstLastInitials(name)} (you)` : name}
          <CrewCountWrapper>
            <Heart src={heartImg} />
            <div>
              {numberFormatter(crewCount)}{' '}
              {crewCount === 1 ? 'person' : 'people'} recruited
            </div>
          </CrewCountWrapper>
        </Name>
      </LeftColumn>
    </Row>
  );
}

LeaderboardPerson.propTypes = {
  you: PropTypes.bool,
  person: PropTypes.object,
  index: PropTypes.number,
};

export default LeaderboardPerson;
