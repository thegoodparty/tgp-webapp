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
  margin-top: 24px;
  display: flex;
  align-items: center;
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

function CrewWrapper({ crew, tab = 'crew', loading }) {
  return (
    <PageWrapper white>
      <H1>Good Party Leaders</H1>
      <Body style={{ marginTop: '15px', marginBottom: '24px' }}>
        See where you rank among{' '}
        <Link to="?article=1ic6T6fhH0jZLNvX5aZkDe">your crew</Link>, and{' '}
        <Link to="/you/crew/leaderboard">overall</Link> in recruiting people to
        The Good Party.
      </Body>
      <TabWrapper>
        <Tab className={tab === 'crew' ? 'active' : ''} to="/you/crew">
          <Body11>YOUR CREW</Body11>
        </Tab>
        <Tab
          className={tab !== 'crew' ? 'active' : ''}
          to="/you/crew/leaderboard"
        >
          <Body11>OVERALL</Body11>
        </Tab>
      </TabWrapper>
      {!loading && crew ? (
        <>
          {crew.map((crewMember, index) => (
            <RankedCrewWrapper key={crewMember.uuid}>
              <Rank>{index + 1}</Rank>
              <CrewMember crewMember={crewMember} />
              <TextWrapper>
                <NameLocation>
                  <Name>{crewMember.name}</Name>
                  <Body11>
                    {crewMember.shortState}
                    {crewMember.districtNumber &&
                      `-${crewMember.districtNumber}`}
                  </Body11>
                </NameLocation>
                {crewMember.feedback && (
                  <Body11>"{crewMember.feedback}"</Body11>
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
};

export default CrewWrapper;
