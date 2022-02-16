/**
 *
 * UpdatesSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body19 } from '/components/shared/typogrophy';
import Updates from '../../elections/CandidateNewWrapper/Updates';

const Wrapper = styled.section`
  margin-top: 36px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-top: 64px;
  }
`;

function UpdatesSection({ updates }) {
  return (
    <Wrapper>
      <Updates candidate={{ updatesList: updates }} withDeepLinks />
    </Wrapper>
  );
}

UpdatesSection.propTypes = {
  updates: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default UpdatesSection;
