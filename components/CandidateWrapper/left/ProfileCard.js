/**
 *
 * ProfileCard
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';

import { Font16, FontH1 } from '../../shared/typogrophy';
import { partyResolver } from '../../../helpers/electionsHelper';
import { CandidateContext } from '../../../containers/CandidatePage';

const ImgWrapper = styled.div`
  margin: 12px 0 24px;
  height: 250px;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: 400px;
  }
`;

function ProfileCard() {
  const { candidate } = useContext(CandidateContext);
  const { firstName, lastName, party, race } = candidate;
  return (
    <section>
      <Font16 data-cy="profile-card-title">Meet the Candidate</Font16>
      <FontH1 style={{ margin: '10px 0 20px' }} data-cy="profile-card-name">
        {firstName} {lastName}
      </FontH1>
      <Font16 data-cy="profile-card-party">
        {partyResolver(party)} Party Candidate <br />
        for <strong>{race}</strong>
      </Font16>
      {candidate.image ? (
        <ImgWrapper style={{ backgroundImage: `url(${candidate.image})` }} />
      ) : (
        <div style={{ height: '32px' }}>&nbsp;</div>
      )}
    </section>
  );
}

export default ProfileCard;
