/**
 *
 * LeverCareers
 *
 */

import React from 'react';
import styled from 'styled-components';
import { FontH2, H2 } from '../shared/typogrophy';

const Wrapper = styled.section`
  #lever-jobs-container {
    display: flex;
    flex-wrap: wrap;
    
    ul.lever-team {
      flex-grow: 0;
      flex-basis: 100%;
      width: 100%;
      @media only screen and (min-width: ${({ theme }) =>
          theme.breakpointsPixels.lg}) {
        flex-grow: 0;
        max-width: 50%;
        flex-basis: 50%;
      }
    }
    .lever-team-title {
      font-size: 1.4em;
    }

    .lever-job-title {
      font-size: 1.3em;
    }
    .lever-job-tag {
      display: none;
    }
    a {
      color: #000;
    }
  }
`;

const Interested = styled.div`
  font-size: 32px;
  margin: 60px 0;
  a {
    text-decoration: underline;
  }
`;

const Text = styled.div`
  font-size: 19px;
  line-height: 36px;
`;

function LeverCareers() {
  return (
    <Wrapper>
      <FontH2 data-cy="opening-title">Openings</FontH2>
      <div id="lever-jobs-container" />
      <Interested>
        Interested in <strong>volunteering</strong> at Good Party?
        <a
          href="https://forms.gle/TJmpYw6UwfWYS4GQA"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {' '}
          Fill out this form
        </a>
      </Interested>
      <Text>
        Good Party reflects what we want for our democracy and country: a place
        where all people are welcome and authentically valued. So, we actively
        seek people from different backgrounds and beliefs. We know that we are
        each born with and have chosen different characteristics and identities.
        We strive to include people who hold different political ideologies, and
        live in different parts of the country. Everyone with good intention is
        welcome at a good party!
      </Text>
    </Wrapper>
  );
}

LeverCareers.propTypes = {};

export default LeverCareers;
