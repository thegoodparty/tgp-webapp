import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import CreatorsImg from 'images/creators.png';
import { Body19, H2 } from 'components/shared/typogrophy';
import { BlueButton } from 'components/shared/buttons';

const CreatorsSectionWrapper = styled.div`
  margin: 5rem 0;
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
const CreatorsSection = ({}) => {
  return (
    <CreatorsSectionWrapper>
      <Grid container>
        <LeftCol item xs={12} md={6}>
          <SectionTitle>
            Calling All Creators!
          </SectionTitle>
          <SectionDescription>
            Join us and to build free open source software and to tell the stories we need to mobilize people and change everything for Good!
          </SectionDescription>
          <LearnMore className="outline">
            Learn More
          </LearnMore>
        </LeftCol>
        <Grid item xs={12} md={6}>
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
};

export default CreatorsSection;
