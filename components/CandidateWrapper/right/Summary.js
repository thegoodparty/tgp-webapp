/**
 *
 * Summary
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { CandidateContext } from '/containers/CandidatePage';
import { FontH3 } from '../../shared/typogrophy';

const Wrapper = styled.article``;

function Summary() {
  const { candidate } = useContext(CandidateContext);
  const { about } = candidate;

  return (
    <Wrapper>
      <FontH3 style={{margin: '0 0 24px'}}>Campaign Summary</FontH3>
      <div dangerouslySetInnerHTML={{ __html: about }} />
    </Wrapper>
  );
}

export default Summary;
