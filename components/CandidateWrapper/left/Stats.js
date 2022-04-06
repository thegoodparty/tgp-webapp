/**
 *
 * Stats
 *
 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { numberFormatter } from '/helpers/numberHelper';
import { Font16 } from '/components/shared/typogrophy';
import { CandidateContext } from '../../../containers/CandidatePage';

const Wrapper = styled.div`
  margin: 18px 0 36px;
  cursor: pointer;
`;

const Row = styled(Font16)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Stat = styled(Font16)`
  margin-top: 12px;
`;

const StatNum = styled.span`
  font-weight: 600;
  min-width: 82px;
  display: inline-block;
`;

function Stats() {
  const router = useRouter();
  const { candidate } = useContext(CandidateContext);

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
            <a>What&apos;s this?</a>
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
