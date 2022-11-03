/**
 *
 * CandidatesSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { CandidatesContext } from '/containers/CandidatesPage';
import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';
import LargeCard from '../shared/CandidateCard/LargeCard';
import { CandidatesWrapperContext } from './index';

const Section = styled.section`
  margin-top: 80px;
`;

const H2 = styled.h2`
  font-size: 21px;
  font-weight: 900;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin: 0 0 20px;
  }
`;

const What = styled.div`
  text-decoration: underline;
  margin-bottom: 25px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    text-align: right;
  }
`;

const Icon = styled(Image)`
  margin: 0 4px;
  display: inline-block;
`;

function CandidatesSection() {
  const { candidates } = useContext(CandidatesContext);
  const { showOnlyGood, setShowOnlyGood } = useContext(
    CandidatesWrapperContext,
  );
  const router = useRouter();
  const { query } = router;
  const { pinned } = query || {};
  const pinnedQuery = pinned ? `?pinned=${pinned}` : '';
  const pathWithNoQuery = router.asPath.split('?')[0];
  return (
    <Section>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Row>
            <H2 data-cy="candidates-section-title">Top Trending Candidates </H2>
          </Row>
        </Grid>
        <Grid item xs={12} md={6}>
          <What>
            <Link
              href={`${pathWithNoQuery}?article=5zIbKVU0wCIAszTOyogGAB`}
              data-cy="good-certified-link"
            >
              What is{' '}
              <Icon src="/images/heart.svg" alt="GP" width={14} height={11} />{' '}
              GOOD CERTIFIED?
            </Link>
          </What>
        </Grid>
      </Grid>
      {(candidates || []).map((candidate) => (
        <React.Fragment key={candidate.id}>
          {((showOnlyGood && candidate.isClaimed) || !showOnlyGood) && (
            <LargeCard candidate={candidate} />
          )}
        </React.Fragment>
      ))}
      {(!candidates || candidates.length === 0) && (
        <div className="text-center">
          <FontH3>No Results match your filters</FontH3>
          <br />
          <Link href={`/candidates${pinnedQuery}`}>Remove all filters</Link>
        </div>
      )}
    </Section>
  );
}

export default CandidatesSection;
