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
  margin: 12px 0 0;
  height: 250px;
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: 400px;
  }
`;

function ProfileCard() {
  const { candidate } = useContext(CandidateContext);
  const { firstName, lastName, party, otherParty, race } = candidate;
  return (
    <section>
      <Font16>Meet the Candidate</Font16>
      <FontH1 style={{ margin: '10px 0 20px' }}>
        {firstName} {lastName}
      </FontH1>
      <Font16>
        {partyResolver(party, otherParty)} {party !== 'I' ? 'Party' : ''}{' '}
        Candidate <br />
        for <strong>{race}</strong>
      </Font16>
      {candidate.image ? (
        <ImgWrapper
          style={{ backgroundImage: `url(${encodeURI(candidate.image)})` }}
        />
      ) : (
        <div style={{ height: '32px' }}>&nbsp;</div>
      )}
    </section>
  );
}

export default ProfileCard;
