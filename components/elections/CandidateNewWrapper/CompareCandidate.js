/**
 *
 * ComparedCandidate
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H3, Body11 } from '../../shared/typogrophy';
import CandidateAvatar from '../../shared/CandidateCard/CandidateAvatar';
import { BiLinkExternal } from 'react-icons/bi';
import TooltipModal from './TooltipModal';

const CandidateName = styled(H3)`
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

const CandidateNameWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const Website = styled(Body11)`
  text-align: center;
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.purple};
`;

const Factor = styled.span`
  border-bottom: 1px dotted #000;
  cursor: pointer;
`;

const InfoWrapper = styled(Body11)`
  margin-top: 32px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray7};
  line-height: 1.8 !important;
  img {
    display: inline-block;
    margin-bottom: 5px;
    height: 15px;
    width: auto;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 36px;
  }
`;
const ICONS = {
  X: '/images/no.svg',
  x: '/images/no.svg',
  V: '/images/checkmark.svg',
  v: '/images/checkmark.svg',
  Y: '/images/checkmark.svg',
  y: '/images/checkmark.svg',
  No: '/images/no.svg',
  Yes: '/images/checkmark.svg',
  '?': '/images/question.svg',
};
function ComparedCandidate({ candidate, setTopicCallback }) {
  if (!candidate) {
    return <NotFound />;
  }
  const { image, name, party, website } = candidate;
  const comparedFactors = { ...candidate };
  delete comparedFactors.name;
  delete comparedFactors.party;
  delete comparedFactors.image;
  delete comparedFactors.website;
  const factors = Object.keys(comparedFactors);
  let cleanParty = party ? party.charAt(0) : '';
  if (party === 'Liberation' || party === 'LI') {
    cleanParty = 'LI';
  }
  return (
    <>
      <CandidateAvatar party={cleanParty} avatar={encodeURI(image)} centered />
      <CandidateNameWrapper>
        <CandidateName>{name}</CandidateName>
      </CandidateNameWrapper>
      <a href={website} target="_blank" rel="nofollow">
        <Website>
          <span>CAMPAIGN WEBSITE</span>
          &nbsp;
          <BiLinkExternal />
        </Website>
      </a>

      {factors.map(factor => (
        <InfoWrapper>
          {ICONS[comparedFactors[factor]] ? (
            <img src={ICONS[comparedFactors[factor]]} alt="icon" />
          ) : (
            <>{comparedFactors[factor]}</>
          )}{' '}
          <br />{' '}
          <Factor onClick={() => setTopicCallback(factor)}>{factor}</Factor>
        </InfoWrapper>
      ))}
    </>
  );
}

ComparedCandidate.propTypes = {
  candidate: PropTypes.object,
  setTopicCallback: PropTypes.func,
};

export default ComparedCandidate;
