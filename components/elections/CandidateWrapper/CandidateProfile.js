import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body13, Body, Body9 } from 'components/shared/typogrophy';

import { convertURI } from 'helpers/candidatesHelper';

const ReportError = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
  text-transform: uppercase;
`;

const OpenSecretsLink = styled(Body9)`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.gray7};
`;

const BallotpediaNoData = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const CandidateProfile = ({ candidate }) => {
  const { candidateInfo, keyMessages, name } = candidate;

  const ballotpediaLink = candidate.source
    ? candidate.source
    : 'https://ballotpedia.org/';

  if (!candidateInfo && !keyMessages) {
    return <></>;
  }
  return (
    <>
      <div data-cy="profile-wrapper">
        <Body className="bold600" style={{ marginTop: '48px' }}>
          Candidate Profile:
        </Body>
        <div>
          <Body13 style={{ marginTop: '12px' }}>
            From{' '}
            <a
              href={ballotpediaLink}
              target="_blank"
              data-cy="ballot-link-1"
              rel="nofollow"
            >
              Ballotpedia page
            </a>{' '}
            for {name}:<br />
            <br />
          </Body13>
          {candidateInfo && (
            <Body13 dangerouslySetInnerHTML={{ __html: candidateInfo }} />
          )}
          {keyMessages && (
            <>
              <br />
              <strong>Key Messages:</strong>
              <Body13 dangerouslySetInnerHTML={{ __html: keyMessages }} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

CandidateProfile.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidateProfile;
