/**
 *
 * ProfileCard
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Font16, FontH1 } from '/components/shared/typogrophy';
import { partyResolver } from '/helpers/electionsHelper';
import { CandidateContext } from '/containers/CandidatePage';
import GoodCertifiedButton from '../../shared/buttons/GoodCertifiedButton';

const Section = styled.section`
  margin-bottom: 22px;
`;

const ImgWrapper = styled.div`
  margin: 12px 0 8px;
  height: 110px;
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  //border-radius: 50%;
`;

function ProfileCard() {
  const { candidate } = useContext(CandidateContext);
  const { firstName, lastName, party, otherParty, race } = candidate;

  const router = useRouter();
  return (
    <Section>
      <Grid container spacing={4}>
        {candidate.image && (
          <Grid item xs={5}>
            <ImgWrapper
              style={{ backgroundImage: `url(${encodeURI(candidate.image)})` }}
            />
            <Link
              href={`${router.asPath}?article=5zIbKVU0wCIAszTOyogGAB`}
              passHref
            >
              <a className="no-underline">
                <GoodCertifiedButton />
              </a>
            </Link>
          </Grid>
        )}
        <Grid item xs={candidate.image ? 7 : 12}>
          <Font16 data-cy="profile-card-title">Meet the Candidate</Font16>
          <FontH1
            style={{ margin: '10px 0', lineHeight: '36px' }}
            data-cy="profile-card-name"
          >
            {firstName}
            <br />
            {lastName}
          </FontH1>
          <Font16 data-cy="profile-card-party">
            {partyResolver(party, otherParty)} {party !== 'I' ? 'Party' : ''}{' '}
            Candidate <br />
            for <strong>{race}</strong>
          </Font16>
        </Grid>
      </Grid>
    </Section>
  );
}

export default ProfileCard;
