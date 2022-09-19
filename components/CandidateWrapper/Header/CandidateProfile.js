/**
 *
 * CandidateProfile
 *
 */

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { CandidateContext } from '/containers/CandidatePage';
import FollowButtonContainer from '/containers/shared/FollowButtonContainer';

import Row from '../../shared/Row';
import CandidateRoundAvatar from '../../shared/CandidateRoundAvatar';
import { partyRace } from '/helpers/candidatesHelper';
import Modal from '../../shared/Modal';
import ClaimModal from './ClaimModal';

const Text = styled.div`
  margin-left: 30px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    margin-left: 36px;
  }
`;

const Name = styled.h1`
  font-size: 36px;
  font-weight: 900;
  line-height: 32px;
  margin: 0 0 12px;
`;

const H2 = styled.h2`
  font-size: 16px;
  margin: 0;
  font-weight: 400;
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
  const { firstName, lastName, isClaimed } = candidate;
  const [showModal, setShowModal] = useState(false);

  return (
    <Row>
      <CandidateRoundAvatar candidate={candidate} large imageOnly priority />
      <Text>
        <Name data-cy="candidate-name">
          {firstName}
          <br />
          {lastName}
        </Name>
        <H2 data-cy="candidate-race">{partyRace(candidate)}</H2>
        <ButtonWrapper>
          <FollowButtonContainer candidate={candidate} />
        </ButtonWrapper>
        {!isClaimed && (
          <Claim data-cy="candidate-claimed">
            Is this you?{' '}
            <ClaimLink
              onClick={() => setShowModal(true)}
              data-cy="candidate-claim-page"
            >
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
