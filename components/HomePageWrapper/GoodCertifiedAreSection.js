import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import StyledH2 from './StyledH2';
import SectionImg from './SectionImg';
import { PurpleButton } from '../shared/buttons';
import { H2, Body, Body19, Body12 } from '../shared/typogrophy';

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const Img = styled.img`
  margin-left: 16px;
  width: 60px;
  height: auto;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 74px;
  }
`;

const PointWrapper = styled.div`
  display: flex;
  margin-bottom: 36px;
  align-items: flex-start;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 48px;
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

const points = [
  {
    title: 'Non-Partisan',
    icon: 'images/icons/non-partisan.svg',
    body:
      'Good Party candidates pledge to caucus (meet) with everyone, but NEVER to pay or fundraise for either Republican or Democratic parties.',
  },
  {
    title: 'Small Money',
    icon: 'images/icons/certification-badge.svg',
    body:
      'Good Party candidate pledge to take a majority of their funding from small money donations, or self-financing with matching rules that mimic publicly funded elections.',
  },
  {
    title: 'Anti-Corruption',
    icon: 'images/icons/anti-corruption.svg',
    body:
      'Good Party candidates pledge to abide and advance the Anti-Corruption Act championed by Represent.us.',
  },
  {
    title: 'Accountable',
    icon: 'images/icons/accountable.svg',
    body:
      'Good Party candidates pledge to openly share their calendar, and, to the extent possible, to live-stream, closed caption and searchable archiving of all meetings on public time.',
  },
];

const GoodCertifiedAreSection = () => {
  return (
    <>
      <Row>
        <H2>Good Certified candidates are: </H2>
        <Img src="images/icons/certification-badge.svg" alt="tgp certified" />
      </Row>
      <Grid container spacing={5} alignItems="center">
        {points.map(point => (
          <Grid item xs={12} md={6}>
            <PointWrapper>
              <PointIcon src={point.icon} />
              <div>
                <Body>
                  <strong>{point.title}</strong>
                  <UnderText>{point.body}</UnderText>
                </Body>
              </div>
            </PointWrapper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default GoodCertifiedAreSection;
