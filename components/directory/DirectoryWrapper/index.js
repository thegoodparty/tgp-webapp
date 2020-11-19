/**
 *
 * DirectoryWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import PageWrapper from 'components/shared/PageWrapper';
import { H1, H2, H3 } from 'components/shared/typogrophy';
import { candidateRoute } from 'helpers/electionsHelper';

const Wrapper = styled.div`
  a {
    display: inline-block;
    margin: 1rem 1rem 0 0;
  }
`;

function DirectoryWrapper({ candidates }) {
  const candidatesList = chamber => (
    <>
      {chamber?.map(cand => <Link href={candidateRoute(cand)} key={`${cand.name}${cand.id}`}>{cand.name}</Link>)}
    </>
  );

  return (
    <PageWrapper>
      <H1>Directory Page</H1>
      <br />
      {candidates && (
        <Wrapper>
          <H3>Presidential Candidates</H3>
          <br />
          {candidatesList(candidates.presidential)}
          <br />
          <br />
          <H3>Senate Candidates</H3>
          <br />
          {candidatesList(candidates.senateIncumbents)}
          {candidatesList(candidates.senateCands)}
          <br />
          <br />
          <H3>House Candidates</H3>
          <br />
          {candidatesList(candidates.houseIncumbents)}
          {candidatesList(candidates.houseCands)}
          <br />
          <br />
        </Wrapper>
      )}
    </PageWrapper>
  );
}

DirectoryWrapper.propTypes = {
  candidates: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default DirectoryWrapper;
