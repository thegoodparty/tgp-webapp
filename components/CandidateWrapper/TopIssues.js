/**
 *
 * TopIssues
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CandidateContext } from '/containers/CandidatePage';
import { Pill } from './Header/TopIssuesPills';
import Row from '../shared/Row';
import BlackButton, { InnerButton } from '../shared/buttons/BlackButton';
import { removeWhiteSpaces } from '/helpers/stringHelper';
import { candidateColor } from '../../helpers/candidatesHelper';
import ShareModal from '../shared/ShareModal';

const Wrapper = styled.article`
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  left: -20px;
  height: 34px;
  width: 3px;
`;

const IssueWrapper = styled.div`
  &.selected {
    .issue {
      background-color: #e5e5e5;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .position {
      max-height: 800px;
      padding: 16px;
    }
  }
`;

const Position = styled.div`
  font-weight: 300;
  margin: 8px 0 18px;
`;

const Title = styled.h3`
  font-size: 24px;
  margin: 0 0 24px;
`;

const TopRow = styled(Row)`
  justify-content: space-between;
  align-items: baseline;
`;

function TopIssues() {
  const [showShare, setShowShare] = useState(false);
  const router = useRouter();
  const { candidatePositions, candidate } = useContext(CandidateContext);
  const { color } = candidate;
  const brightColor = candidateColor(candidate);
  if (candidatePositions?.length === 0) {
    return <></>;
  }

  return (
    <Wrapper>
      <Line style={{ backgroundColor: brightColor }} />

      <Title data-cy="top-issues-title">Top Issues</Title>

      {candidatePositions.map((candPosition) => (
        <IssueWrapper key={candPosition.id} data-cy="top-issue">
          <Pill
            data-cy="top-issue-position"
            id={removeWhiteSpaces(candPosition.position?.name)}
          >
            {candPosition.position?.name}
          </Pill>
          <Position data-cy="top-issue-name" className="break-word">
            {candPosition.description}
          </Position>
        </IssueWrapper>
      ))}

      {showShare && <ShareModal closeCallback={() => setShowShare(false)} />}
    </Wrapper>
  );
}

export default TopIssues;
