/**
 *
 * VolunteersSection
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { Body, H2 } from '../shared/typogrophy';

export const MaxContent = styled.div`
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
      theme.breakpointsPixels.lg}) {
    font-size: 48px;
    line-height: 62px;
  }
`;

const Volunteer = styled(Body)`
  margin: 8px 0;
`;

const volunteers = [
  {
    name: 'Navid Aslani',
    link: 'https://www.linkedin.com/in/navidaslani/',
    role: 'Operations',
  },
  {
    name: 'Kai Gradert',
    link: 'https://www.linkedin.com/in/kaigradert/',
    role: 'Product / Design',
  },
  {
    name: 'Jeehye Jung',
    link: 'https://www.linkedin.com/in/jeehye-jung-6b4b0361',
    role: 'Social Media / Instagram',
  },
  {
    name: 'Kam Kafi',
    link: 'https://www.linkedin.com/in/kamkafi/',
    role: 'Creator Relations',
  },
  {
    name: " Brian O'Neil",
    link: 'https://www.linkedin.com/in/brian-o-neil-a8b5283/',
    role: ' HR / FEC / Finance',
  },
  {
    name: 'Gobi Rahimi',
    link: 'https://www.linkedin.com/in/gobi-m-rahimi-3725721/',
    role: 'Creator',
  },
  {
    name: 'Jean Rousseau',
    link: 'https://www.linkedin.com/in/jeanrousseau/',
    role: 'Field Operations',
  },
];

function VolunteersSection() {
  return (
    <Content>
      <Grid spacing={2} container>
        <Grid item xs={12} md={4}>
          <StyledH2>Volunteers</StyledH2>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid spacing={2} container>
            {volunteers.map(volunteer => (
              <Grid item xs={12} md={6} key={volunteer.name}>
                <Volunteer>
                  <a
                    href={volunteer.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <strong>{volunteer.name}</strong>
                  </a>
                  <br />
                  {volunteer.role}
                </Volunteer>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      If you’re interested in volunteering your time and talent, join us! Please
      fill out{' '}
      <a
        href="https://forms.gle/TJmpYw6UwfWYS4GQA"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {' '}
        this form
      </a>
      . You can also email{' '}
      <a href="mailto:ask@goodparty.org">ask@goodparty.org</a> if you have any
      questions.
    </Content>
  );
}

VolunteersSection.propTypes = {};

export default VolunteersSection;
