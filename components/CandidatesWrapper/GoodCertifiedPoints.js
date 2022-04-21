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
import { GOOD_CERTIFIED } from '../../utils/constants';

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

function GoodCertifiedPoints({ homepageMode = false }) {
  return (
    <Grid container spacing={3}>
      {GOOD_CERTIFIED.map((point) => (
        <Grid item xs={12} lg={4} key={point.title} data-cy="gc-item">
          <Point className={homepageMode && 'homepage-mode'}>
            <Row className="row">
              {!homepageMode && (
                <>
                  <Image
                    src={`/images/icons/${point.icon}`}
                    height={24}
                    width={24}
                    className="img"
                    data-cy="gc-item-img"
                  />
                  &nbsp;
                </>
              )}
              <FontH3 data-cy="gc-item-title">{point.title}</FontH3>
            </Row>
            <div data-cy="gc-item-content">{point.content}</div>
          </Point>
        </Grid>
      ))}
    </Grid>
  );
}

export default GoodCertifiedPoints;
