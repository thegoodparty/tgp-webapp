/**
 *
 * SimilarCampaigns
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { CandidateContext } from '/containers/CandidatePage';
import { FontH3 } from '/components/shared/typogrophy';
import { candidateRoute, partyResolver } from '/helpers/electionsHelper';

const Wrapper = styled.section`
  margin: 48px 0;
`;
const SimilarWrapper = styled.div`
  margin: 12px 0;
`;

const Name = styled.div`
  font-weight: 900;
  a {
    color: #000;
    text-decoration: underline;
  }
`;

const Running = styled.div`
  margin: 12px 0;
  font-size: 13px;
`;
const Match = styled.span`
  margin-right: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary};
`;

function SimilarCampaigns() {
  const { similarCampaigns } = useContext(CandidateContext);
  if (!similarCampaigns || similarCampaigns.length === 0) {
    return <> </>;
  }
  return (
    <Wrapper>
      <FontH3>View Similar Campaigns</FontH3>
      {similarCampaigns.map((similar) => (
        <SimilarWrapper key={similar.candidate.id}>
          <Name>
            <Link href={candidateRoute(similar.candidate)} passHref>
              <a>
                {similar.candidate.firstName} {similar.candidate.lastName}
              </a>
            </Link>
          </Name>
          <Running>
            {partyResolver(similar.candidate.party)} candidate running for{' '}
            {similar.candidate.race}
          </Running>
          <div>
            {similar.matchingIssues.map((match) => (
              <Match key={match.id}>#{match.name}</Match>
            ))}
          </div>
        </SimilarWrapper>
      ))}
    </Wrapper>
  );
}

export default SimilarCampaigns;
