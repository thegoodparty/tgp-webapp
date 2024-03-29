/**
 *
 * CandidatesSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { ProfilePageContext } from '/containers/profile/ProfilePage';
import CandidateCard from '../../shared/CandidateCard';
import { FontH3 } from '../../shared/typogrophy';
import LoadingAnimation from '../../shared/LoadingAnimation';

const Wrapper = styled.section`
  margin-top: 24px;
`;

function CandidatesSection() {
  const { loading, candidates } = useContext(ProfilePageContext);
  return (
    <Wrapper>
      {loading ? (
        <LoadingAnimation fullPage={false} />
      ) : (
        <Grid container spacing={3} alignItems="stretch">
          {candidates && (
            <>
              {candidates.map((candidate) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={candidate?.id}
                  data-cy="candidate-card"
                >
                  <CandidateCard candidate={candidate} withFollowButton />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      )}
      {!loading && candidates.length === 0 && (
        <div className="text-center">
          <FontH3>You are not following any candidates yet.</FontH3>
          <br />
          <Link href="/candidates">Find Candidates</Link>
        </div>
      )}
    </Wrapper>
  );
}

export default CandidatesSection;
