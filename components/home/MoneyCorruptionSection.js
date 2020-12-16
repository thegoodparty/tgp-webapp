import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
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

const MoneyCorruptionSection = () => (
  <MoneyCorruptionSectionWrapper>
    <Grid container>
      <LeftCol item xs={12} sm={7} md={6}>
        <SectionTitle>
          Money has corrupted <br />
          BOTH major U.S. parties
        </SectionTitle>
      </LeftCol>
      <Grid item xs={12} sm={5} md={6}>
        <img
          src="/images/white-house.png"
          alt="white-house-dollar"
          className="full-image"
        />
      </Grid>
    </Grid>
  </MoneyCorruptionSectionWrapper>
);

export default MoneyCorruptionSection;
