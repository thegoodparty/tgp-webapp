/**
 *
 * Stats
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { numberFormatter } from 'helpers/numberHelper';
import { Body13 } from '../../shared/typogrophy';

const Wrapper = styled.div`
  margin-top: 18px;
  cursor: pointer;
`;

const Row = styled(Body13)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stat = styled(Body13)`
  margin-top: 12px;
`;

const StatNum = styled.span`
  font-weight: 700;
  min-width: 82px;
  display: inline-block;
`;

function Stats({ candidate }) {
  const router = useRouter();

  if (!candidate) {
    return <></>;
  }
  const { likelyVoters, votesNeeded, unrepVoters } = candidate;
  if (!likelyVoters && !votesNeeded && !unrepVoters) {
    return <></>;
  }

  return (
    <Link href={`${router.asPath}?article=4KOzae6PB45c9GQY9Xi9UX`}>
      <Wrapper>
        <Row>
          <strong>Voting Stats &amp; Projections</strong>
          <Link
            href={`${router.asPath}?article=4KOzae6PB45c9GQY9Xi9UX`}
            passHref
          >
            <a>What's this?</a>
          </Link>
        </Row>
        {unrepVoters ? (
          <Stat>
            <StatNum>{numberFormatter(unrepVoters)} </StatNum> &nbsp;
            Unrepresented Voters in this race
          </Stat>
        ) : (
          <></>
        )}
        {votesNeeded ? (
          <Stat>
            <StatNum>{numberFormatter(votesNeeded)} </StatNum> &nbsp; Votes
            Needed to win
          </Stat>
        ) : (
          <></>
        )}
        {likelyVoters ? (
          <Stat>
            <StatNum>{numberFormatter(likelyVoters)} </StatNum> &nbsp; Likely
            Voters so far
          </Stat>
        ) : (
          <></>
        )}
      </Wrapper>
    </Link>
  );
}

Stats.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Stats;
