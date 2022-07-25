/**
 *
 * TopIssues
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import { Font16 } from '../../shared/typogrophy';
import { removeWhiteSpaces } from '../../../helpers/stringHelper';

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
  max-height: 0;
  padding: 0;
`;

function TopIssues() {
  const { candidatePositions } = useContext(CandidateContext);
  const [selected, setSelected] = useState(false);

  if (candidatePositions?.length === 0) {
    return <></>;
  }

  const handleSelected = (id) => {
    if (id === selected) {
      setSelected(false);
    } else {
      setSelected(id);
    }
  };
  return (
    <Wrapper>
      <strong style={{ margin: '24px 0' }} data-cy="top-issues-title">Top Issues</strong>
      {candidatePositions.map((candPosition) => (
        <IssueWrapper
          key={candPosition.id}
          className={selected === candPosition.id && 'selected'}
          data-cy="top-issue"
        >
          <Issue
            onClick={() => {
              handleSelected(candPosition.id);
            }}
            className="issue"
            data-cy="top-issue-position"
          >
            #{removeWhiteSpaces(candPosition.position?.name)}
          </Issue>
          <Position className="position"  data-cy="top-issue-name">
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
