/**
 *
 * GoodCertifiedPoints
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';

import { FontH3 } from '../shared/typogrophy';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Point = styled.div`
  margin-bottom: 16px;
  padding: 0 24px 12px;

  &.homepage-mode {
    .row {
      justify-content: initial;
    }
    font-size: 20px;
    line-height: 36px;
  }
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

function GoodCertifiedPoints({ homepageMode = false }) {
  return (
    <Grid container spacing={3}>
      {points.map((point) => (
        <Grid item xs={12} lg={4} key={point.title}>
          <Point className={homepageMode && 'homepage-mode'}>
            <Row className="row">
              {!homepageMode && (
                <>
                  <Image
                    src={`/images/icons/${point.icon}`}
                    height={24}
                    width={24}
                    className="img"
                  />
                  &nbsp;
                </>
              )}
              <FontH3>{point.title}</FontH3>
            </Row>
            <div>{point.content}</div>
          </Point>
        </Grid>
      ))}
    </Grid>
  );
}

export default GoodCertifiedPoints;
