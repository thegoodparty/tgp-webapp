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

const Icon = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

const points = [
  {
    icon: (
      <Icon role="img" aria-label="honest">
        😇
      </Icon>
    ),
    title: 'Honest',
    content:
      'Good Certified candidates are committed to serving with utmost integrity, and using technology to be open, transparent and responsive representatives of the people.',
  },
  {
    icon: (
      <Icon role="img" aria-label="Independent">
        🗽
      </Icon>
    ),
    title: 'Independent',
    content:
      'Good Certified candidates are not Republican or Democratic politicians. They are independent-minded people from across the political spectrum, dedicated to advancing the priorities of their constituents.',
  },
  {
    icon: (
      <Icon role="img" aria-label="People-Powered">
        🙌🏼
      </Icon>
    ),
    title: 'People-Powered',
    content:
      'Good Certified candidates run to serve people, not corporations, unions, political action committees or special interests. They run  grass-roots campaigns that depend on being connected to and promoted by the people that they’ll be serving.',
  },
];

function GoodCertifiedPoints({ homepageMode = false }) {
  return (
    <Grid container spacing={3}>
      {points.map((point) => (
        <Grid item xs={12} lg={4} key={point.title}>
          <Point className={homepageMode && 'homepage-mode'}>
            <Row className="row">
              {!homepageMode && <>{point.icon}</>}
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
