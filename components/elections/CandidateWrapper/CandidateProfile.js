import React from 'react';
import PropTypes from 'prop-types';

import { Body13, Body } from 'components/shared/typogrophy';

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
