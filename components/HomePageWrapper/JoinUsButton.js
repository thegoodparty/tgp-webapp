import React from 'react';
import styled from 'styled-components';
import { PurpleButton } from '../shared/buttons';
import { Body } from '../shared/typogrophy';

const StyledBody = styled(Body)`
  color: #fff;
  padding: 0 24px;
`;

const JoinUsButton = () => {
  return (
    <PurpleButton>
      <StyledBody>JOIN US</StyledBody>
    </PurpleButton>
  );
};

export default JoinUsButton;
