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
import { Pill } from '../Header/TopIssuesPills';
import Row from '../../shared/Row';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';

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

const Position = styled.div`
  font-weight: 300;
  margin: 8px 0 18px;
`;

const Title = styled.h3`
  font-size: 24px;
  margin: 0 0 24px;
`;

function TopIssues() {
  const router = useRouter();
  const { candidatePositions } = useContext(CandidateContext);

  if (candidatePositions?.length === 0) {
    return <></>;
  }

  return (
    <Wrapper>
      <Row style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Title data-cy="top-issues-title">Top Issues</Title>
        <Link href={`${router.asPath}?share=true`} passHref>
          <a id="top-issues-share" className="no-underline">
            <BlackButton style={{ padding: '4px 3px' }}>
              <InnerButton>Share</InnerButton>
            </BlackButton>
          </a>
        </Link>
      </Row>

      {candidatePositions.map((candPosition) => (
        <IssueWrapper key={candPosition.id} data-cy="top-issue">
          <Pill data-cy="top-issue-position">
            {candPosition.position?.name}
          </Pill>
          <Position data-cy="top-issue-name">
            {candPosition.description}
          </Position>
        </IssueWrapper>
      ))}
    </Wrapper>
  );
}

export default TopIssues;
