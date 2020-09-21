import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import WhiteHouseImg from 'images/white-house.png';
import { Title, Subtitle } from 'components/shared/typogrophy';

const MoneyCorruptionSectionWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 5rem;
`;
const SectionTitle = styled(Title)`
  margin-bottom: 0.5rem;
`;
const LeftCol = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MoneyCorruptionSection = ({}) => {
  return (
    <MoneyCorruptionSectionWrapper>
      <Grid container>
        <LeftCol item xs={12} md={6}>
          <SectionTitle>
            Money has corrupted <br />
            BOTH major U.S. parties
          </SectionTitle>
          <Subtitle>
            We need to take back Congress from corrupt career politicians before
            we can fix any other issue.
          </Subtitle>
        </LeftCol>
        <Grid item xs={12} md={6}>
          <LazyLoadImage
            src={WhiteHouseImg}
            alt="white-house-dollar"
            width="100%"
            height="100%"
          />
        </Grid>
      </Grid>
    </MoneyCorruptionSectionWrapper>
  );
};

export default MoneyCorruptionSection;
