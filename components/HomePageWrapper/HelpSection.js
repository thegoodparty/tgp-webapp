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
      <StyledH2>Sign up to stay informed</StyledH2>
      <TextWrapper>
        <GrayText>
          We’re always adding candidates. Join the Good Party and we’ll keep you
          posted as the roster grows.
        </GrayText>
      </TextWrapper>
      <JoinUsButton />
    </>
  );
};

export default HelpSection;
