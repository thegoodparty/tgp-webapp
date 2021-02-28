import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { H2, Body, Body12 } from '../shared/typogrophy';

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
    icon: 'images/icons/small-money.svg',
    body:
      'Good Party candidate pledge to take a majority of their funding from small money donations, or self-financing with matching rules that mimic publicly funded elections.',
  },
  {
    title: 'Anti-Corruption',
    icon: 'images/icons/anti-corruption.svg',
    body:
      'Good Party Certfied candidates pledge to openly share their calendar and the content of meetings on public time.  They will also abide by and work to advance the',
    endLink: { text: 'Anti-Corruption Act', href: '/?article=7jm2j9gapWwEoVwVD3VX6o' },
  },
];

const GoodCertifiedAreSection = () => {
  return (
    <>
      <Row>
        <H2>Good Certified candidates are: </H2>
        <Img src="images/icons/certification-badge2.svg" alt="tgp certified" />
      </Row>
      <Grid container spacing={5} alignItems="center">
        {points.map(point => (
          <Grid item xs={12} md={4}>
            <PointWrapper>
              <PointIcon src={point.icon} />
              <div>
                <Body>
                  <strong>{point.title}</strong>
                  <UnderText>
                    {point.body}{' '}
                    {point.endLink && (
                      <Link href={point.endLink.href}>
                        {point.endLink.text}
                      </Link>
                    )}
                  </UnderText>
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
