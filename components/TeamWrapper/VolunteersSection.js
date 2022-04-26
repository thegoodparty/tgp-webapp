/**
 *
 * VolunteersSection
 *
 */

import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { Body, H2 } from '../shared/typogrophy';

const Content = styled.div`
  padding: 48px 8px;
`;

const StyledH2 = styled(H2)`
  font-size: 28px;
  line-height: 36px;
  font-weight: 900;
  margin: 40px 0;
`;

const Volunteer = styled(Body)`
  margin: 8px 0;
  font-size: 18px;
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
      <StyledH2>Volunteers</StyledH2>

      <Grid spacing={2} container>
        {volunteers.map((volunteer) => (
          <Grid item xs={12} md={6} lg={3} key={volunteer.name}>
            <Volunteer>
              <a
                href={volunteer.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <strong>{volunteer.name}</strong>
              </a>
              <div style={{ marginTop: '12px' }}>{volunteer.role}</div>
            </Volunteer>
          </Grid>
        ))}

        <div style={{ marginTop: '48px' }}>
          If you’re interested in volunteering your time and talent, join us!
          Please fill out{' '}
          <a
            href="https://forms.gle/TJmpYw6UwfWYS4GQA"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {' '}
            this form
          </a>
          . <br />
          You can also email{' '}
          <a href="mailto:ask@goodparty.org">ask@goodparty.org</a> if you have
          any questions.
        </div>
      </Grid>
    </Content>
  );
}

VolunteersSection.propTypes = {};

export default VolunteersSection;
