import React from 'react';
import styled from 'styled-components';

import { PurpleButton } from '../shared/buttons';
import { Body } from '../shared/typogrophy';

const StyledBody = styled.div`
  color: ${({ theme }) => theme.colors.purple};
  padding: 0 18px;
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0.1px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 16px;
    line-height: 20px;
    padding: 0 32px;
  }
`;

const NominateButton = ({ style = {} }) => {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSe78SJOH5edK4jTyOWVhs-b8AIf9_ElONlc5opPgzHnnpm_0Q/viewform?usp=sf_link"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <PurpleButton className="outline" style={style}>
        <StyledBody>NOMINATE A CANDIDATE</StyledBody>
      </PurpleButton>
    </a>
  );
};

export default NominateButton;
