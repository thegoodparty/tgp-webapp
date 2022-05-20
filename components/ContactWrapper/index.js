/**
 *
 * ContactWrapper
 *
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageWrapper from '../shared/PageWrapper';
import Grid from '@material-ui/core/Grid';
import { FontH1 } from '../shared/typogrophy';

const Inner = styled.div`
  margin: 0 auto;
  width: 80%;
  min-width: ${1280 * 0.8}px;
`;

const Sub = styled.div`
  font-size: 20px;
  line-height: 33px;
  font-weight: 600;
  font-style: italic;
`;

const H1 = styled.h1`
  margin-top: 0;
  font-size: 48px;
  line-height: 53px;
  font-weight: 900;
`;

const FormWrapper = styled.div`
  iframe {
    width: 80vw !important;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.lg}) {
      width: 100% !important;
    }
  }
`;

function ContactWrapper() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    script.async = true;

    document.body.appendChild(script);
    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '21589597',
          formId: 'c60165c3-704d-4cfa-a8de-d89e28f06a7c',
          target: '#hubspotForm',
        });
      }
    });
  }, []);
  return (
    <PageWrapper>
      <Inner>
        <Grid container spacing={8} style={{ marginTop: '40px' }}>
          <Grid item xs={12} lg={6}>
            <H1 style={{ marginTop: 0 }}>
              Have questions or want to get involved?
              <br />
              <br />
              Contact us.
            </H1>
            <Sub>We’ll do our best to get back to you within 24 hours. </Sub>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormWrapper>
              <div id="hubspotForm" />
            </FormWrapper>
          </Grid>
        </Grid>
      </Inner>
    </PageWrapper>
  );
}

ContactWrapper.propTypes = {};

export default ContactWrapper;
