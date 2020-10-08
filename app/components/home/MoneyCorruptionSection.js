import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import WhiteHouseImg from 'images/white-house.png';
import { Title } from 'components/shared/typogrophy';

const MoneyCorruptionSectionWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 5rem;
  padding: 20px;
`;
const SectionTitle = styled(Title)`
  text-align: center;
  margin-bottom: 16px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
    margin-bottom: 0;
    padding-left: 10px;
    font-size: 36px;
  }

  @media only screen and (min-width: 1065px) {
    padding-left: 30px;
    font-size: 40px;
  }
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
