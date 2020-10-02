import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ZipFinderPage from 'containers/intro/ZipFinderPage';

import { Body14, Subtitle } from 'components/shared/typogrophy';
import ChallengerItem from './ChallengerItem';

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
  margin-bottom: 3rem;
`;

const ZipFinderWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  border-radius: 8px;
`;

const ChallengersSection = ({ challengers }) => {
  const [cardHeight, setCardHeight] = useState(353);
  const [heightSet, setHeightSet] = useState(false);
  useEffect(() => {
    if (!heightSet) {
      const elem = document.getElementById('last-challenger');
      if (elem) {
        setCardHeight(elem.offsetHeight);
        setHeightSet(true);
      }
    }
  });
  return (
    <ChallengersSectionWrapper>
      <SectionTitle>Good Challengers for 2020</SectionTitle>
      <SectionDescription>
        Good candidates of all stripes are challenging the status quo with fresh
        ideas, not money. We’re mobilizing voters to join these candidates’
        voting blocs to see if we can get them enough votes to win!
      </SectionDescription>

      <ChallengersList>
        <Grid container spacing={3}>
          {challengers &&
            challengers.map((challenger, index) => (
              <Grid item xs={12} md={6} lg={4} key={challenger.id}>
                <ChallengerItem
                  challenger={challenger}
                  id={
                    index === challengers.length - 1 ? 'last-challenger' : false
                  }
                />
              </Grid>
            ))}

          <Grid item xs={12} md={6} lg={4}>
            <ZipFinderWrapper style={{ height: `${cardHeight}px` }}>
              <ZipFinderPage cardDisplay />
            </ZipFinderWrapper>
          </Grid>
        </Grid>
      </ChallengersList>
    </ChallengersSectionWrapper>
  );
};

ChallengersSection.propTypes = {
  challengers: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default ChallengersSection;
