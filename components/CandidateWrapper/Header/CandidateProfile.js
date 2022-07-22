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
import CandidatesRoundPreview from '../../shared/CandidateRoundPreview';
import { partyResolver } from '../../../helpers/electionsHelper';
import { Font16 } from '../../shared/typogrophy';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';

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
  const { candidate, candidatePositions } = useContext(CandidateContext);
  const { firstName, lastName, party, otherParty, race, color } = candidate;
  const brightColor = color?.color ? color.color : '#000';

  return (
    <Row>
      <CandidatesRoundPreview candidate={candidate} large imageOnly />
      <Text>
        <Name>
          {firstName}
          <br />
          {lastName}
        </Name>
        <Font16>
          {partyResolver(party, otherParty)} {party !== 'I' ? 'Party' : ''}{' '}
          Candidate <br />
          for <strong>{race}</strong>
        </Font16>
        <ButtonWrapper>
          <BlackButton
            style={{
              backgroundColor: brightColor,
              borderColor: brightColor,
              marginTop: '12px',
            }}
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </ButtonWrapper>
      </Text>
    </Row>
  );
}

export default CandidateProfile;
