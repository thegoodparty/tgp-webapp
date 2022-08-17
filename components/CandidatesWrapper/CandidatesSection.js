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
import CandidateCard from '../shared/CandidateCard';
import { FontH3 } from '../shared/typogrophy';

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
  const router = useRouter();
  return (
    <Section>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <H2>Top Trending Candidates</H2>
        </Grid>
        <Grid item xs={12} md={6}>
          <What>
            <Link
              href={`${router.asPath}?article=5zIbKVU0wCIAszTOyogGAB`}
              passHref
            >
              <a>
                What is{' '}
                <Icon src="/images/heart.svg" alt="" width={14} height={11} />{' '}
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
            <CandidateCard candidate={candidate} />
          </Grid>
        ))}
      </Grid>
      {(!candidates || candidates.length === 0) && (
        <div className="text-center">
          <FontH3>No Results match your filters</FontH3>
          <br />
          <Link href="/candidates">Remove all filters</Link>
        </div>
      )}
    </Section>
  );
}

export default CandidatesSection;
