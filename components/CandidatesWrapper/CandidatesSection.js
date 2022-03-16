/**
 *
 * CandidatesSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CandidatesContext } from '/containers/CandidatesPage';
import CandidateCard from '../shared/CandidateCard';

const Section = styled.section`
  margin: 50px 0;
`;

function CandidatesSection() {
  const { candidates} = useContext(CandidatesContext);
  return (
    <Section>
      <Grid container spacing={3}  alignItems="stretch">
        {candidates.map((candidate) => (
          <Grid item xs={12} md={6} lg={4} key={candidate.id}>
            <CandidateCard candidate={candidate} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}

export default CandidatesSection;
