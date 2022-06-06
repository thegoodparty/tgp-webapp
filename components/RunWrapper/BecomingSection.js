/**
 *
 * BecomingSection
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Font16, Font18, FontH2, FontH3 } from '../shared/typogrophy';
import StartCampaignButton from './StartCampaignButton';

const Font20 = styled(Font16)`
  font-size: 20px;
  margin-bottom: 16px;
`;

const H2 = styled(FontH2)`
  font-size: 38px;
  margin: 10px 0;
`;

const H3Strong = styled.span`
  font-size: 26px;
  margin: 12px 0 24px;
  display: block;
`;

function BecomingSection() {
  return (
    <section>
      <H2 style={{ marginBottom: '50px' }} data-cy="becoming-good-certified">
        Good Party Free Tools Provide:
      </H2>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} data-cy="becoming-section-1">
          <Font20>
            <strong>Viability</strong>
          </Font20>
          Show supporters that it’s possible to win and your campaign is not a
          wasted vote.
        </Grid>

        <Grid item xs={12} md={4} data-cy="becoming-section-2">
          <Font20>
            <strong>Insights</strong>
          </Font20>
          Actionable insights about how to grow awareness for your campaign.
        </Grid>

        <Grid item xs={12} md={4} data-cy="becoming-section-3">
          <Font20>
            <strong>People</strong>
          </Font20>
          Online and grassroots influencers, organizers, and volunteers to help
          your campaign win.
        </Grid>
      </Grid>

      <FontH3 style={{ marginTop: '50px' }}>
        <span style={{ fontWeight: '300' }}>Best of all, it’s totally</span>
        <br />
        <H3Strong>transparent and free.</H3Strong>
      </FontH3>
      <StartCampaignButton />
    </section>
  );
}

BecomingSection.propTypes = {};

export default BecomingSection;
