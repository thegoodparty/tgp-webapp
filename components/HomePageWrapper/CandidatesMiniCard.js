import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import CandidateRoundAvatar from '../shared/CandidateRoundAvatar';
import { candidateRoute } from '../../helpers/electionsHelper';
import { candidateColor, partyRace } from '../../helpers/candidatesHelper';
import { daysTill } from '../../helpers/dateHelper';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import CandidateProgressBar from '../shared/CandidateProgressBar';

const Wrapper = styled.div`
  height: 100%;
  padding-bottom: 90px;
  position: relative;
`;

const Name = styled.div`
  font-weight: 900;
  font-size: 26px;
  margin: 12px 0 6px;
`;
const Party = styled.div`
  font-size: 16px;
  margin-bottom: 35px;
  min-height: 42px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const CandidateMiniCard = ({ candidate }) => {
  const { firstName, lastName, followers, raceDate, votesNeeded, color } =
    candidate;

  let thisWeek = 0;
  let lastWeek = 0;
  if (followers) {
    thisWeek = followers.thisWeek;
    lastWeek = followers.lastWeek;
  }

  const days = daysTill(raceDate);

  const diff = thisWeek - lastWeek;

  const brightColor = candidateColor(candidate);
  return (
    <Wrapper>
      <Link href={candidateRoute(candidate)} passHref>
        <a
          className="no-underline"
          data-cy="candidate-link"
          id={`candidate-preview-${firstName}-${lastName}`}
        >
          <CandidateRoundAvatar candidate={candidate} />
          <Name>
            {firstName} {lastName}
          </Name>
          <Party>{partyRace(candidate, false)}</Party>

          <CandidateProgressBar
            votesNeeded={votesNeeded}
            peopleSoFar={thisWeek}
            peopleThisPeriod={diff}
            color={brightColor}
            days={days}
            withAchievement={false}
            withAnimation={false}
          />
          <ButtonWrapper>
            <BlackButton
              fullWidth
              style={{
                backgroundColor: brightColor,
                borderColor: brightColor,
                marginTop: '30px',
              }}
            >
              <InnerButton>View Campaign</InnerButton>
            </BlackButton>
          </ButtonWrapper>
        </a>
      </Link>
    </Wrapper>
  );
};

export default CandidateMiniCard;
