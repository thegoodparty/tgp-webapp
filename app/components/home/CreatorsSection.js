import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreatorsImg from 'images/creators.svg';
import { Body19, H2 } from 'components/shared/typogrophy';
import { BlueButton } from 'components/shared/buttons';

const CreatorsSectionWrapper = styled.div`
  margin: 0 0 2rem;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 5rem 0;
  }
`;

const SectionTitle = styled(H2)`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const LeftCol = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 1rem;
`;

const SectionDescription = styled(Body19)`
  margin-top: 1rem;
`;

const LearnMore = styled(BlueButton)`
  && {
    margin-top: 2rem;
    width: 11rem;
  }
`;
const CreatorsSection = () => (
  <CreatorsSectionWrapper>
    <Grid container>
      <LeftCol item xs={12} sm={8} md={6}>
        <SectionTitle>Calling All Creators!</SectionTitle>
        <SectionDescription>
          Join us to build free open source software and to tell the stories we
          need to mobilize people and change everything for Good!
        </SectionDescription>
        <Link to="/creators">
          <LearnMore className="outline">Learn More</LearnMore>
        </Link>
      </LeftCol>
      <Grid item xs={12} sm={4} md={6}>
        <LazyLoadImage
          src={CreatorsImg}
          alt="calling-creators"
          width="100%"
          height="100%"
        />
      </Grid>
    </Grid>
  </CreatorsSectionWrapper>
);

export default CreatorsSection;
