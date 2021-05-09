import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import StyledH2 from './StyledH2';
import StyledH3 from './StyledH3';
import NominateButton from './NominateButton';



const Img = styled.img`
  width: 60px;
  height: auto;
`;

const PointWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    margin-bottom: 12px;
  }
`;

const PointIcon = styled.img`
  margin-right: 12px;
  width: 30px;
  height: auto;
`;

const UnderText = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray7};
`;

const NominateWrapper = styled.div`
  text-align: center;
  margin-top: 42px;
`;

const PointTitle = styled.div`
  font-size: 19px;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.gray2};
`;

const PointBody = styled.div`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
`;

const points = [
  {
    title: 'Independent',
    icon: 'images/icons/non-partisan.svg',
    body: 'Never pay dues to nor fundraise for Republicans or Democrats.',
  },
  {
    title: 'People Powered',
    icon: 'images/icons/people-powered.svg',
    body:
      'Good candidates only accept donations from individuals - not corporations, unions, PACs, or other entities. ',
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
        <StyledH2>How to become a Good Certified candidate</StyledH2>
        <StyledH3>Candidates must pledge to be:</StyledH3>
      </div>
      <Grid container spacing={5} alignItems="flex-start">
        {points.map(point => (
          <Grid item xs={12} md={mdColumns}>
            <PointWrapper>
              <PointIcon src={point.icon} />
              <PointTitle>
                <strong>{point.title}</strong>
              </PointTitle>
            </PointWrapper>
            <div>
              <PointBody>
                <UnderText>
                  {point.body}{' '}
                  {point.endLink && (
                    <Link href={point.endLink.href}>{point.endLink.text}</Link>
                  )}
                </UnderText>
              </PointBody>
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
