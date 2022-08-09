/**
 *
 * CandidateProfile
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { CandidateContext } from '/containers/CandidatePage';
import Row from '../../shared/Row';
import CandidateRoundAvatar from '../../shared/CandidateRoundAvatar';
import { Font16 } from '../../shared/typogrophy';
import BlackButton, { InnerButton } from '../../shared/buttons/BlackButton';
import { CandidateWrapperContext } from '../index';
import { candidateColor, partyRace } from '/helpers/candidatesHelper';
import Modal from '../../shared/Modal';
import ClaimModal from './ClaimModal';

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

const Claim = styled.div`
  margin-top: 12px;
  color: #868686;
`;

const ClaimLink = styled.span`
  color: #000;
  cursor: pointer;
  text-decoration: underline;
`;

function CandidateProfile() {
  const { candidate } = useContext(CandidateContext);
  const { openFollowModalCallback } = useContext(CandidateWrapperContext);
  const { firstName, lastName, color, isClaimed } = candidate;
  const [showModal, setShowModal] = useState(false);
  const brightColor = candidateColor(candidate);

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
            id="candidate-follow-button"
          >
            <InnerButton>FOLLOW</InnerButton>
          </BlackButton>
        </ButtonWrapper>
        {!isClaimed && (
          <Claim>
            Is this you?{' '}
            <ClaimLink onClick={() => setShowModal(true)}>
              Claim this page
            </ClaimLink>
          </Claim>
        )}
      </Text>
      <Modal closeModalCallback={() => setShowModal(false)} open={showModal}>
        <ClaimModal closeModalCallback={() => setShowModal(false)} />
      </Modal>
    </Row>
  );
}

export default CandidateProfile;
