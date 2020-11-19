import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Body9, Body13 } from 'components/shared/typogrophy';
import CandidateAvatar from 'components/shared/CandidateAvatar';
import { partyResolver, candidateRoute } from 'helpers/electionsHelper';
import { numberFormatter } from '../../helpers/numberHelper';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const RankIndex = styled(Body9)`
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const CandName = styled(Body9)`
  margin-left: 16px;
`;

const Party = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const Supporters = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray7};
`;

const BlueBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
`;

const RankedCandidate = ({ candidate, index, withLink = true }) => {
  const Wrapper = ({ children }) => {
    if (withLink) {
      return <Link href={candidateRoute(candidate)}>{children}</Link>;
    }
    return <div>{children}</div>;
  };

  return (
    <Wrapper>
      <Row>
        <RankIndex>{index}</RankIndex>
        <CandidateAvatar
          size="responsive"
          src={candidate.image}
          good={candidate.isGood}
          name={candidate.name}
        />
        <CandName>
          <BlueBody13>{candidate.name}</BlueBody13>
          <Party>
            {candidate.party === 'VC'
              ? 'GOOD PARTY APPROVED'
              : partyResolver(candidate.party)}
          </Party>
          <Supporters>{numberFormatter(candidate.ranking)} Supporters</Supporters>
        </CandName>
      </Row>
    </Wrapper>
  );
};

RankedCandidate.propTypes = {
  candidate: PropTypes.object,
  index: PropTypes.number,
  withLink: PropTypes.bool,
};

export default RankedCandidate;
