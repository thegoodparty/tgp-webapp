import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import StyledH2 from './StyledH2';
import SectionImg from './SectionImg';
import { PurpleButton } from '../shared/buttons';
import { H2, Body, Body19, Body12 } from '../shared/typogrophy';
import GrayText from './GrayText';
import JoinUsButton from './JoinUsButton';

const TextWrapper = styled.div`
  margin-bottom: 24px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 50%;
  }
`;

const HelpSection = () => {
  return (
    <>
      <StyledH2>Help good candidates</StyledH2>
      <TextWrapper>
        <GrayText>
          Currently, we’re focused on getting some wins for good candidates in
          New York and California. Create an account to help these candidates
          win.
        </GrayText>
      </TextWrapper>
      <JoinUsButton />
    </>
  );
};

export default HelpSection;
