/**
 *
 * LeverCareers
 *
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2 } from '../shared/typogrophy';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.grayE};
  padding: 48px 10px;
`;

const MaxContent = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Content = styled(MaxContent)`
  padding: 48px 12px;
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 16px;
  line-height: 25px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 18px;
  }
`;

const StyledH2 = styled(H2)`
  font-size: 20px;
  line-height: 28px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 48px;
    line-height: 62px;
  }
`;

function LeverCareers() {
  return (
    <Wrapper>
      <Content>
        <Grid spacing={2} container>
          <Grid item xs={12} md={4}>
            <StyledH2>Jobs</StyledH2>
          </Grid>
          <Grid item xs={12} md={8}>
            <div id="lever-jobs-container" />
            <br />
            <br />
            Beyond these open positions for our core team, there are many ways
            people are contributing to Good Party. To learn more about how you
            can volunteer your time and talent, send a quick email to{' '}
            <a href="mailto:ask@goodparty.org">ask@goodparty.org</a>.
            <br />
            <br />
            To make our country’s democracy a good party where all people are
            actually represented, our organization’s makeup must reflect that
            larger goal. We come from different backgrounds. We were born with
            and have chosen different characteristics and identities. We hold
            different political ideologies. We live all over the country.
            Everyone’s welcome at a good party!
          </Grid>
        </Grid>
      </Content>
    </Wrapper>
  );
}

LeverCareers.propTypes = {};

export default LeverCareers;
