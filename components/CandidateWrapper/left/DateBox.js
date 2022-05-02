/**
 *
 * DateBox
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import VoteDate from './VoteDates';

const Wrapper = styled.div`
  margin: 0 12px;
  background-color: #f0f0f0;
  padding: 0 24px 24px;

  &.rounded {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

function DateBox({ showPast }) {
  const { candidate } = useContext(CandidateContext);

  if (!candidate) {
    return <></>;
  }

  const { certifiedDate, ballotDate, earlyVotingDate, raceDate } = candidate;

  return (
    <Wrapper className={showPast && 'rounded'}>
      <VoteDate
        title="Good People Certified"
        date={certifiedDate}
        showPast={showPast}
      />
      <VoteDate
        title="Made it On the Ballot"
        date={ballotDate}
        showPast={showPast}
      />
      <VoteDate
        title="Early Voting Begins"
        date={earlyVotingDate}
        showPast={showPast}
      />
      <VoteDate title="Election Night" date={raceDate} showPast={showPast} />
    </Wrapper>
  );
}

export default DateBox;
