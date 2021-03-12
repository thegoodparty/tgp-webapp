/**
 *
 * IllustrationSection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body, Body11, Body13, Body19, H2, H3 } from '../shared/typogrophy';

const Wrapper = styled.div`
  text-align: center;
  padding: 28px;
  margin-top: 64px;
  box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
    2px -2px 5px rgba(224, 212, 234, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(224, 212, 234, 0.9),
    inset 1px 1px 1px rgba(255, 255, 255, 0.3),
    inset -1px -1px 1px rgba(224, 212, 234, 0.5);

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 48px;
  }
`;

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const PurpleBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.purple};
`;

const Img = styled.img`
  width: 80%;
  height: auto;
  margin: 42px auto 12px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 60%;
  }
`;

function IllustrationSection() {
  return (
    <Wrapper>
      <H3>How The Good Party Works</H3>
      <StyledBody13>We make votes matter more than money</StyledBody13>
      <Img src="images/see-good-candidates.svg" />
      <PurpleBody13>See Good Certified candidates</PurpleBody13>
      <Img src="images/tell-others.svg" />
      <PurpleBody13>Join their crowd-voting campaigns </PurpleBody13>
      <Img src="images/join-campaigns.svg" />
      <PurpleBody13>Tell others and get out the vote!</PurpleBody13>
    </Wrapper>
  );
}

IllustrationSection.propTypes = {};

export default IllustrationSection;
