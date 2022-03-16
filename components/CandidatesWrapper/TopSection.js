/**
 *
 * TopSection
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CandidatesContext } from '/containers/CandidatesPage';

import { Font16, FontH1, FontH3 } from '../shared/typogrophy';
import CertifiedBadge from '../shared/CertifiedBadge';
import BlackOutlinedButton from '../shared/buttons/BlackOutlinedButton';
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  color: #666;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 48px;
`;

const Point = styled.div`
  margin-bottom: 16px;
  padding: 0 24px 12px;
`;

const Why = styled.div`
  margin-top: 50 px;
`;

const points = [
  {
    icon: 'independent.svg',
    title: 'Independent',
    content:
      "Good Certified candidates are not Republican or Democratic politicians. They're real people running grassroots campaigns from across the political spectrum.",
  },
  {
    icon: 'people-powered-black.svg',
    title: 'People Powered',
    content:
      'Good Certified candidates run to serve real living people. So, the majority of money raised for their campaign must come from people -- not from corporations, unions, PACs, or other non-living entities.',
  },
  {
    icon: 'anti-corruption-black.svg',
    title: 'Anti-Corruption',
    content:
      'Good Certified candidates are committed to serving as honest, transparent, and responsive representatives of the people.',
  },
];

function TopSection() {
  const { user } = useContext(CandidatesContext);
  const router = useRouter();
  return (
    <section className="text-center">
      <Row>
        <CertifiedBadge height={50} />
        &nbsp;&nbsp;
        <FontH1>Good Certified Candidates are...</FontH1>
      </Row>
      <Subtitle>FROM ACROSS THE POLITICAL SPECTRUM</Subtitle>
      <Grid container spacing={3}>
        {points.map((point) => (
          <Grid item xs={12} lg={4} key={point.title}>
            <Point>
              <Row>
                <Image
                  src={`/images/icons/${point.icon}`}
                  height={24}
                  width={24}
                />
                <FontH3>&nbsp; {point.title}</FontH3>
              </Row>
              {!user && <div>{point.content}</div>}
            </Point>
          </Grid>
        ))}
      </Grid>
      {!user && (
        <Why>
          <Link
            href={`${router.asPath}?article=FqZOWMEEYfcXbASjaRkMU`}
            passHref
          >
            <a>
              <BlackOutlinedButton active>
                Why is this important?
              </BlackOutlinedButton>
            </a>
          </Link>
        </Why>
      )}
    </section>
  );
}

export default TopSection;