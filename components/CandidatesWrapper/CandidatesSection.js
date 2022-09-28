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
import { FaFilter } from 'react-icons/fa';

import { CandidatesContext } from '/containers/CandidatesPage';
import CandidateCard from '../shared/CandidateCard';
import { FontH3 } from '../shared/typogrophy';
import Row from '../shared/Row';

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

const Filters = styled.div`
  display: inline-block;
  background-color: #f3f3f3;
  padding: 12px 12px 6px;
  border-radius: 8px;
  margin-bottom: 16px;
  margin-left: 20px;
  cursor: pointer;

  &.active {
    background-color: #000;
    color: #fff;
  }
`;

function CandidatesSection({ toggleFiltersCallback, showFilters }) {
  const { candidates, experimentVariant } = useContext(CandidatesContext);
  const router = useRouter();
  const { query } = router;
  const { pinned } = query || {};
  const pinnedQuery = pinned ? `?pinned=${pinned}` : '';
  return (
    <Section>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Row>
            <H2 data-cy="candidates-section-title">Top Trending Candidates </H2>
            <Filters
              onClick={toggleFiltersCallback}
              className={showFilters && 'active'}
            >
              <FaFilter />
            </Filters>
          </Row>
        </Grid>
        <Grid item xs={12} md={6}>
          <What>
            <Link
              href={`${router.asPath}?article=5zIbKVU0wCIAszTOyogGAB`}
              passHref
            >
              <a data-cy="good-certified-link">
                What is{' '}
                <Icon src="/images/heart.svg" alt="GP" width={14} height={11} />{' '}
                GOOD CERTIFIED?
              </a>
            </Link>
          </What>
        </Grid>
      </Grid>
      <Grid container spacing={3} alignItems="stretch">
        {(candidates || []).map((candidate) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={candidate.id}
            data-cy="candidate-card"
          >
            <CandidateCard
              candidate={candidate}
              doubleButton={experimentVariant === '1'}
            />
          </Grid>
        ))}
      </Grid>
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
