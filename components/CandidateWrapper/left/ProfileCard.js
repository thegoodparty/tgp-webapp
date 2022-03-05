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
      <Font16>Meet the Candidate</Font16>
      <FontH1 style={{ margin: '10px 0 20px' }}>
        {firstName} {lastName}
      </FontH1>
      <Font16>
        {partyResolver(party)} Party Candidate <br />
        for <strong>{race}</strong>
      </Font16>
      {candidate.image && (
        <ImgWrapper style={{ backgroundImage: `url(${candidate.image})` }} />
      )}
    </section>
  );
}

export default ProfileCard;
