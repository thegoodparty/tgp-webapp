import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body13, Body, Body9 } from 'components/shared/typogrophy';

import { convertURI } from 'helpers/candidatesHelper';

const OpenSecretsLink = styled(Body9)`
  margin: 16px 0;
  color: ${({ theme }) => theme.colors.gray7};
`;

const BallotpediaNoData = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const CandidateWrapper = ({ candidate }) => {
  const [campaignWebsite, setCampaignWebsite] = useState('');

  useEffect(() => {
    if (candidate) {
      setCampaignWebsite(convertURI(candidate.campaignWebsite));
    }
  }, [candidate]);

  return (
    <>
      {campaignWebsite && campaignWebsite !== 'null' && (
        <div data-cy="campaign-website">
          <Body className="bold600" style={{ margin: '48px 0 16px' }}>
            Candidate Policy Positions
          </Body>
          <Body13 dangerouslySetInnerHTML={{ __html: campaignWebsite }} />
          <div className="text-center">
            <BallotpediaNoData style={{ padding: '16px 0' }}>
              <Link
                href="?article=579kihjyIPloNaEw02rniq"
                data-cy="volunteer-article"
              >
                <OpenSecretsLink>
                  COMPILED BY THE GOOD PARTY VOLUNTEERS
                </OpenSecretsLink>
              </Link>
            </BallotpediaNoData>
          </div>
        </div>
      )}
    </>
  );
};

CandidateWrapper.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CandidateWrapper;
