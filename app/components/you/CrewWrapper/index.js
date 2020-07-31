/**
 *
 * CrewWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageWrapper from 'components/shared/PageWrapper';
import {
  H1,
  Body,
  Body13,
  Body11,
  Body9,
} from 'components/shared/typogrophy/index';
import CrewMember from '../CrewMember';

const TabWrapper = styled.div`
  display: flex;
`;

const Tab = styled(Link)`
  text-align: center;
  padding: 10px;
  border-bottom: solid 2px ${({ theme }) => theme.colors.grayF};
  width: 50%;
  cursor: pointer;

  &.active {
    border-color: ${({ theme }) => theme.colors.blue};
    cursor: default;
  }
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

function CrewWrapper({ crew, tab = 'crew', loading, user }) {
  return (
    <PageWrapper white>
      <H1 data-cy="title">Good Party Leaders</H1>
      <Body
        style={{ marginTop: '15px', marginBottom: '24px' }}
        data-cy="description"
      >
        See where you rank among{' '}
        <Link to="?article=1ic6T6fhH0jZLNvX5aZkDe" data-cy="crew-article">
          your crew
        </Link>
        , and{' '}
        <Link to="/you/crew/leaderboard" data-cy="overall-link">
          overall
        </Link>{' '}
        in recruiting people to The Good Party.
      </Body>
      <TabWrapper>
        <Tab
          className={tab === 'crew' ? 'active' : ''}
          to="/you/crew"
          data-cy="crew-tab"
        >
          <Body11>YOUR CREW</Body11>
        </Tab>
        <Tab
          className={tab !== 'crew' ? 'active' : ''}
          to="/you/crew/leaderboard"
          data-cy="overall-tab"
        >
          <Body11>OVERALL</Body11>
        </Tab>
      </TabWrapper>
      {!loading && crew ? (
        <>
          {tab === 'crew' && (
            <RankedCrewWrapper>
              <Rank data-cy="you-rank">1</Rank>
              <CrewMember
                crewMember={user}
                overrideCount={user.crewCount}
                overrideName="YOU"
              />
              <TextWrapper>
                <NameLocation>
                  <Name data-cy="you-crew-name">YOU</Name>

                  <Body11 data-cy="you-location">
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
              <Rank data-cy="crew-rank">{index + 2}</Rank>
              <CrewMember crewMember={crewMember} />
              <TextWrapper>
                <NameLocation>
                  {tab === 'leaderboard' && crewMember.uuid === user.uuid ? (
                    <Name data-cy="crew-member-name">YOU</Name>
                  ) : (
                    <Name data-cy="crew-member-name">{crewMember.name}</Name>
                  )}

                  <Body11 data-cy="crew-location">
                    {crewMember.shortState
                      ? crewMember.shortState.toUpperCase()
                      : ''}
                    {crewMember.districtNumber &&
                      `-${crewMember.districtNumber}`}
                  </Body11>
                </NameLocation>
                {crewMember.feedback && (
                  <Body11 data-cy="crew-feedback">"{crewMember.feedback}"</Body11>
                )}
              </TextWrapper>
            </RankedCrewWrapper>
          ))}
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
