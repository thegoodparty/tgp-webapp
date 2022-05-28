/**
 *
 * HeroSection
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { FontH1 } from '../shared/typogrophy';

const Content = styled.div`
  font-size: 20px;
  line-height: 33px;
  font-weight: 600;
  margin-bottom: 180px;
`;

function HeroSection() {
  return (
    <Grid spacing={6} container style={{ marginTop: '60px' }}>
      <Grid item xs={12} md={6}>
        <FontH1 style={{ marginTop: 0 }} data-cy="team-hero-section-title">
          Working on creating a Good Party for all!
          <br />
          <br />
          Meet the team.
        </FontH1>
      </Grid>
      <Grid item xs={12} md={6}>
        <Content data-cy="team-hero-section-content">
          Good Party’s core team are the people working full-time, part-time, or
          as dedicated volunteers on a mission to make people matter more than
          money in our democracy.
          <br />
          <br />
          If you agree that a functioning democracy that serves people, not
          money, is the problem that must be solved, in order to solve our other
          problems, please consider{' '}
          <Link href="/work-with-us" passHref>
            <a data-cy="team-hero-section-join-link">
              <u>joining us!</u>
            </a>
          </Link>
        </Content>
      </Grid>
    </Grid>
  );
}

HeroSection.propTypes = {};

export default HeroSection;
