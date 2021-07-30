/**
 *
 * TeamWrapper
 *
 */

import React from 'react';
import PageWrapper from '../shared/PageWrapper';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { Body13, H1, H2 } from '../shared/typogrophy';
import TeamSection from './TeamSection';

const Hero = styled.div`
  color: #fff;
  padding: 70px 35px;
  background: ${({ theme }) => theme.colors.purple}
    url('images/team/mobile-shadow.svg') right center no-repeat;
  background-size: contain;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    background: ${({ theme }) => theme.colors.purple}
      url('images/team/desktop-shadow.svg') right center no-repeat;
    background-size: contain;
  }
`;

export const MaxContent = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const StyledH1 = styled(H1)`
  color: #fff;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 66px;
    line-height: 82px;
  }
`;

const Content = styled(MaxContent)`
  padding: 32px 0;
  color: ${({ theme }) => theme.colors.gray7};
`;

const ReverseGrid = styled(Grid)`
  flex-direction: row;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex-direction: row-reverse;
    align-items: center;
  }
`;

const StyledH2 = styled(H2)`
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 48px;
    line-height: 62px;
  }
`;

const Goal = styled(Body13)`
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.gray7};
  line-height: 24px;
`;

function TeamWrapper({ content }) {
  return (
    <PageWrapper isFullWidth white noPadding>
      <Hero>
        <MaxContent>
          <ReverseGrid spacing={2} container>
            <Grid item xs={12} md={6} className="text-right">
              <img src="images/team/team-heart.svg" />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledH1>Meet the Good Party Team</StyledH1>
            </Grid>
          </ReverseGrid>
        </MaxContent>
      </Hero>
      <Content>
        <Grid spacing={2} container>
          <Grid item xs={12} md={4}>
            <StyledH2>The Story of Good Party</StyledH2>
            <Goal>
              Our Goals is simple
              <br />
              Get money out of politics
            </Goal>
          </Grid>
          <Grid item xs={12} md={8}>
            sdsalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak
            sjdhk asjhdkajshdk ajshd ffalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk ajshd ggalsda;sd k;ald
            k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk
            ajshd
            <br />
            <br />
            sdsalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak
            sjdhk asjhdkajshdk ajshd ffalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk ajshd ggalsda;sd k;ald
            k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk
            ajshd
            <br />
            <br />
            sdsalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak
            sjdhk asjhdkajshdk ajshd ffalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk ajshd ggalsda;sd k;ald
            k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk
            ajshd
            <br />
            <br />
            sdsalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak
            sjdhk asjhdkajshdk ajshd ffalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk ajshd ggalsda;sd k;ald
            k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk
            ajshd
            <br />
            <br />
            sdsalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak
            sjdhk asjhdkajshdk ajshd ffalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdalkd jalksjd laksdj lakjds
            lakjs dlka jsdlka jsdlkaj sdlkaj sdlkaj lsdkja lsdkjkajshdk ajshd
            ggalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak
            sjdhk asjhdkajshdk ajshd sdsalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk ajshd ffalsda;sd k;ald
            k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdalkd
            jalksjd laksdj lakjds lakjs dlka jsdlka jsdlkaj sdlkaj sdlkaj lsdkja
            lsdkjkajshdk ajshd ggalsda;sd k;ald k;a dks;alk sd;aj d;dj
            ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk ajshd sdsalsda;sd k;ald
            k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk
            ajshd ffalsda;sd k;ald k;a dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs
            kjdhak sjdhk asjhdalkd jalksjd laksdj lakjds lakjs dlka jsdlka
            jsdlkaj sdlkaj sdlkaj lsdkja lsdkjkajshdk ajshd ggalsda;sd k;ald k;a
            dks;alk sd;aj d;dj ;asljd;ajdjdskjdhs kjdhak sjdhk asjhdkajshdk
            ajshd
          </Grid>
        </Grid>
      </Content>
      <TeamSection />
    </PageWrapper>
  );
}

TeamWrapper.propTypes = {
  content: PropTypes.object,
};

export default TeamWrapper;
