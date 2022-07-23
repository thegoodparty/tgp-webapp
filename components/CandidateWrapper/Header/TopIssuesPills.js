/**
 *
 * TopIssues
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import { Font16 } from '../../shared/typogrophy';

const Wrapper = styled.article`
  margin-top: 14px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: none;
  }
`;

const IssueWrapper = styled.div`
  display: inline-block;
`;

export const Pill = styled(Font16)`
  display: inline-block;
  background-color: #ededed;
  border-radius: 5px;
  padding: 8px 14px;
  margin-top: 10px;
  margin-right: 10px;
  font-weight: 900;
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color: #e5e5e5;
  }
`;

function TopIssuesPills() {
  const { candidatePositions } = useContext(CandidateContext);

  if (candidatePositions?.length === 0) {
    return <></>;
  }

  return (
    <Wrapper>
      {candidatePositions.map((candPosition) => (
        <IssueWrapper key={candPosition.id} data-cy="top-issue">
          <Pill className="issue" data-cy="top-issue-position">
            {candPosition.position?.name}
          </Pill>
        </IssueWrapper>
      ))}
    </Wrapper>
  );
}

export default TopIssuesPills;