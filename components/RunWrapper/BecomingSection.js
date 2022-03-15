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
      <Font18>BECOMING</Font18>
      <H2>Good Certified</H2>
      <Font18 style={{ marginBottom: '50px' }}>GETS YOU ACCESS TO:</Font18>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Font20>
            <strong>Free tools and technology</strong>
          </Font20>
          to help you run your campaign.
        </Grid>

        <Grid item xs={12} md={4}>
          <Font20>
            <strong>Access to strategic guidance</strong>
          </Font20>
          from experienced political operatives to walk you through the process
          from thinking about running to Election Day.
        </Grid>

        <Grid item xs={12} md={4}>
          <Font20>
            <strong>A community of creators</strong>
          </Font20>
          volunteers and organizers too - all working together to fix politics
          for Good!
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
