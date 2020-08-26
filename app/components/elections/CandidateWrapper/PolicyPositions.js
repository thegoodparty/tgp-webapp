import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const InfoWrapper = styled.div`
  .survey-question {
    font-weight: 700;
    margin-top: 36px;
    margin-bottom: 0;
  }
`;

const PolicyPositions = ({ candidate }) => {
  const [candidateInfo, setCandidateInfo] = useState('');

  useEffect(() => {
    if (candidate) {
      const { info } = candidate;
      setCandidateInfo(convertURI(info));
    } else {
      setCandidateInfo('');
    }
  }, [candidate]);

  const { name } = candidate;

  const ballotpediaLink = candidate.source
    ? candidate.source
    : 'https://ballotpedia.org/';

  return (
    <>
      <InfoWrapper data-cy="info-wrapper">
        <Body className="bold600" style={{ marginTop: '48px' }}>
          Candidate Policy Positions:
        </Body>
        {candidateInfo && candidateInfo !== 'null' ? (
          <div>
            <Body13 style={{ marginTop: '12px' }}>
              The following policy positions for {name} were compiled by{' '}
              <a
                href={ballotpediaLink}
                target="_blank"
                data-cy="ballot-link-1"
                rel="nofollow"
              >
                Ballotpedia
              </a>{' '}
              from the candidate&apos;s survey, official campaign website,
              editorials, speeches, and interviews.
            </Body13>
            <Body13 dangerouslySetInnerHTML={{ __html: candidateInfo }} />
            <div className="text-center" style={{ paddingBottom: '16px' }}>
              <a
                href={ballotpediaLink}
                target="_blank"
                data-cy="ballot-link-2"
                rel="nofollow"
              >
                <OpenSecretsLink>
                  CANDIDATE DATA COURTESY OF BALLOTPEDIA
                </OpenSecretsLink>
              </a>
              <a
                href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
                  window.location.href
                }`}
              >
                <ReportError>Report an error</ReportError>
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <BallotpediaNoData style={{ padding: '16px 0' }}>
              No data found for {name} on{' '}
              <a
                href={ballotpediaLink}
                target="_blank"
                data-cy="ballot-link"
                rel="nofollow"
              >
                Ballotpedia
              </a>
              <br />
              <br />
              <a
                href={`mailto:info@thegoodparty.org?subject=Data%20Error:%20Candidate%20Page&body=${
                  window.location.href
                }`}
              >
                <ReportError>Report an error</ReportError>
              </a>
            </BallotpediaNoData>
          </div>
        )}
      </InfoWrapper>
    </>
  );
};

PolicyPositions.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PolicyPositions;
