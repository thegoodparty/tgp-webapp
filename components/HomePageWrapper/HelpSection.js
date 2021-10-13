import React from 'react';
import styled from 'styled-components';
import StyledH2 from './StyledH2';
import GrayText from './GrayText';
import JoinUsButton from './JoinUsButton';

const TextWrapper = styled.div`
  margin-bottom: 24px;
`;

const HelpSection = () => {
  return (
    <div className="text-center">
      <StyledH2>Stay informed</StyledH2>
      <TextWrapper>
        <GrayText>
          We’re always adding candidates. Join the Good Party and we’ll keep you
          posted as the roster grows.
        </GrayText>
      </TextWrapper>
      <JoinUsButton />
    </div>
  );
};

export default HelpSection;
