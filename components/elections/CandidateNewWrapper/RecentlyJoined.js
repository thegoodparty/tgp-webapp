/**
 *
 * RecentlyJoined
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { PurpleButton } from 'components/shared/buttons';
import { Body9, Body11, Body13, Body19, Body } from '../../shared/typogrophy';
const PeopleJoinedIconPurple = '/images/people-joined-purple.svg';
const AnonymousIconPurple = '/images/anonymous-icon-purple.svg';

const InnerButton = styled.div`
  font-size: 14px;
`;

const RecentActivity = styled.div`
  margin-top: 32px;
`;
const RecentActivityTitle = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  margin-bottom: 18px;
  font-weight: 600;
  text-align: left;
`;

const JoinedCount = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray4};
  margin-left: 16px;
`;

const JoinName = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray3};
  font-weight: 600;
`;

const JoinTime = styled(Body11)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const Message = styled(Body)`
  margin-top: 16px;
`;

const RecentJoin = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grayD};
  text-align: left;
`;
function RecentlyJoined({ candidateSupports }) {
  const supporters = candidateSupports || [];
  return (
    <>
      <RecentActivity>
        <RecentActivityTitle>Recent Activity</RecentActivityTitle>
      </RecentActivity>
      <Grid container alignItems="center" style={{ marginBottom: 14 }}>
        <img src={PeopleJoinedIconPurple} alt="share" />
        <JoinedCount>
          {supporters.length} {supporters.length === 1 ? 'person' : 'people'}{' '}
          have taken action
        </JoinedCount>
      </Grid>
      {supporters.map(supporter => (
        <RecentJoin>
          <img
            src={AnonymousIconPurple}
            alt="share"
            style={{ marginRight: '18px' }}
          />
          <div>
            <JoinName>{supporter.user}</JoinName>
            <JoinTime>{supporter.timeAgo}</JoinTime>
            {supporter.message && <Message>{supporter.message}</Message>}
          </div>
        </RecentJoin>
      ))}

      {/*<Box style={{ marginTop: 24 }}>*/}
      {/*  <PurpleButton fullWidth className="outline">*/}
      {/*    <InnerButton>*/}
      {/*      <span>SEE ALL</span>*/}
      {/*    </InnerButton>*/}
      {/*  </PurpleButton>*/}
      {/*</Box>*/}
    </>
  );
}

RecentlyJoined.propTypes = {
  candidateSupports: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default RecentlyJoined;
