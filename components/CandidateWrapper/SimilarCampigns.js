/**
 *
 * SimilarCampaigns
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { FontH3 } from '../shared/typogrophy';

const Wrapper = styled.section`
  margin: 48px 0;
`;

function SimilarCampaigns() {
  return (
    <Wrapper>
      <FontH3>View Similar Campaigns</FontH3>
    </Wrapper>
  );
}

export default SimilarCampaigns;
