import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { H3, Body, Body12 } from '../shared/typogrophy';
import CandidatesWrapper from '../CandidatesWrapper';
import StyledH2 from './StyledH2';
import NominateButton from './NominateButton';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const Img = styled.img`
  margin-left: 16px;
  width: 60px;
  height: auto;
`;

const PointWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 12px;
  }
`;

const PointIcon = styled.img`
  margin-right: 12px;
  width: 30px;
  height: auto;
`;

const UnderText = styled(Body12)`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const StyledH3 = styled(H3)`
  font-size: 27px;
  line-height: 32px;
  margin-bottom: 48px;
  margin-top: 10px;
`;

const NominateWrapper = styled.div`
  text-align: center;
  margin-top: 42px;
`;

const points = [
  {
    title: 'Non-Partisan',
    icon: 'images/icons/non-partisan.svg',
    body: 'Never pay dues to nor fundraise for Republicans or Democrats.',
  },
  {
    title: 'Small Money',
    icon: 'images/icons/small-money.svg',
    body:
      'Accept a majority of their funding from individual donations under $200.',
  },
  {
    title: 'Anti-Corruption',
    icon: 'images/icons/anti-corruption.svg',
    body: 'Openly share their public meeting calendars and advance the ',
    endLink: {
      text: 'Anti-Corruption Act',
      href: '/?article=7jm2j9gapWwEoVwVD3VX6o',
    },
  },
];

const GoodCertifiedAreSection = ({ mdColumns = 4 }) => {
  return (
    <>
      <div className="text-center">
        <Img src="images/icons/certification-badge.svg" alt="tgp certified" />
        <StyledH2>What’s a Good Certified candidate?</StyledH2>
        <StyledH3>Independent candidates who pledge to be:</StyledH3>
      </div>
      <Grid container spacing={5} alignItems="center">
        {points.map(point => (
          <Grid item xs={12} md={mdColumns}>
            <PointWrapper>
              <PointIcon src={point.icon} />
              <Body>
                <strong>{point.title}</strong>
              </Body>
            </PointWrapper>
            <div>
              <Body>
                <UnderText>
                  {point.body}{' '}
                  {point.endLink && (
                    <Link href={point.endLink.href}>{point.endLink.text}</Link>
                  )}
                </UnderText>
              </Body>
            </div>
          </Grid>
        ))}
      </Grid>
      <NominateWrapper>
        <NominateButton />
      </NominateWrapper>
    </>
  );
};

GoodCertifiedAreSection.propTypes = {
  mdColumns: PropTypes.number,
};

export default GoodCertifiedAreSection;
