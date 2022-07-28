/**
 *
 * CandidateProfile
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { CandidateContext } from '/containers/CandidatePage';
import Row from '../../shared/Row';
import CandidateRoundAvatar from '../../shared/CandidateRoundAvatar';
import { partyResolver } from '/helpers/electionsHelper';
import { Font16 } from '../../shared/typogrophy';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { CandidateWrapperContext } from '../index';
import { partyRace } from '/helpers/candidatesHelper';

const Text = styled.div`
  margin-left: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-left: 36px;
  }
`;

const Name = styled.div`
  font-size: 36px;
  font-weight: 900;
  line-height: 32px;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: block;
  }
`;

function CandidateProfile() {
  const { candidate } = useContext(CandidateContext);
  const { openFollowModalCallback } = useContext(CandidateWrapperContext);
  const { firstName, lastName, party, otherParty, race, color } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  return (
    <Row>
      <CandidateRoundAvatar candidate={candidate} large imageOnly />
      <Text>
        <Name>
          {firstName}
          <br />
          {lastName}
        </Name>
        <Font16>{partyRace(candidate)}</Font16>
        <ButtonWrapper>
          <BlackButton
            style={{
              backgroundColor: brightColor,
              borderColor: brightColor,
              marginTop: '12px',
            }}
            onClick={openFollowModalCallback}
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </ButtonWrapper>
      </Text>
    </Row>
  );
}

export default CandidateProfile;
