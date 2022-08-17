/**
 *
 * CandidatesSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { CandidatesContext } from '/containers/CandidatesPage';
import CandidateCard from '../shared/CandidateCard';
import { FontH3 } from '../shared/typogrophy';

const Section = styled.section`
  margin: 50px 0;
`;

function CandidatesSection() {
  const { candidates } = useContext(CandidatesContext);
  return (
    <Section>
      <Grid container spacing={3} alignItems="stretch">
        {(candidates || []).map((candidate) => (
          <Grid item xs={12} md={6} lg={4} key={candidate.id} data-cy="candidate-card">
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
