/**
 *
 * TopIssues
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import { Font16 } from '../../shared/typogrophy';

const Wrapper = styled.article``;

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

const Issue = styled(Font16)`
  background-color: #ededed;
  border-radius: 10px;
  padding: 16px;
  margin-top: 10px;
  font-weight: 900;
  cursor: pointer;
  transition: background-color 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: #e5e5e5;
  }
`;

const Position = styled.div`
  background-color: #f0f0f0;
  font-weight: 300;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  transition: height 0.4s, padding 0.4s;
  max-height: 0;
  padding: 0;
`;

function TopIssues() {
  const { candidatePositions } = useContext(CandidateContext);
  const [selected, setSelected] = useState(false);
  console.log('candidatePositions', candidatePositions);
  return (
    <Wrapper>
      <strong style={{ margin: '24px 0' }}>Top Issues</strong>
      {candidatePositions.map((candPosition) => (
        <IssueWrapper
          key={candPosition.id}
          className={selected === candPosition.id && 'selected'}
        >
          <Issue
            onClick={() => {
              setSelected(candPosition.id);
            }}
            className="issue"
          >
            #{candPosition.position?.name}
          </Issue>
          <Position className="position">
            {candPosition.topIssue?.name}
            <br />
            <br />
            {candPosition.description}
          </Position>
        </IssueWrapper>
      ))}
    </Wrapper>
  );
}

export default TopIssues;
