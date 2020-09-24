import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Body14, Subtitle } from 'components/shared/typogrophy';
import ChallengerItem from './ChallengerItem';
import { BlueButton } from 'components/shared/buttons';

const ChallengersSectionWrapper = styled.div`
  padding-top: 7rem;
  padding-bottom: 5rem;
`;

const SectionTitle = styled(Subtitle)`
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SectionDescription = styled(Body14)`
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.gray4};
`;

const ChallengersList = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  margin-bottom: 3rem;
`;

const ChallengersSection = ({ challengers }) => (
  <ChallengersSectionWrapper>
    <SectionTitle>Good Challengers for 2020</SectionTitle>
    <SectionDescription>
      Good candidates of all stripes are challenging the status quo with fresh
      ideas, not money. We’re mobilizing voters to join these candidates’ voting
      blocs to see if we can get them enough votes to win!
    </SectionDescription>

    <ChallengersList>
      <Grid container spacing={3}>
        {challengers.map(challenger => (
          <Grid item xs={12} md={6} lg={4} key={challenger.id}>
            <ChallengerItem challenger={challenger} />
          </Grid>
        ))}
      </Grid>
    </ChallengersList>
  </ChallengersSectionWrapper>
);

ChallengerItem.propTypes = {
  challengers: PropTypes.array,
};

export default ChallengersSection;
