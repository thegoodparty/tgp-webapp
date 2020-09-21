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
import { Body14 } from 'components/shared/typogrophy';
import { BlueButton } from 'components/shared/buttons';

const CreatorsSectionWrapper = styled.div`
  padding: 4rem 0;
`;

const RightCol = styled(Grid)`
  && {
    border-top: 1px solid ${({ theme }) => theme.colors.grayC};
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: 3rem;
      border-left: 1px solid ${({ theme }) => theme.colors.grayC};
      border-top: none;
    }
  }
`;

const LeftCol = styled(Grid)`
  && {
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 3rem;
    }
  }
`;

const ColDescription = styled(Body14)`
  margin-top: 1.5rem;
  min-height: 50px;
`;

const SubmitButton = styled(BlueButton)`
  && {
    margin-top: 3rem;
    width: 14rem;
  }
`;

const ColTitle = styled(Body14)`
  font-weight: 600;
`;

const CreatorsSection = ({}) => {
  return (
    <CreatorsSectionWrapper>
      <Grid container>
        <LeftCol item xs={12} md={6}>
          <ColTitle>Stay Connected</ColTitle>
          <ColDescription>
            We're just getting started. Stay in the loop for updates as we build
            a better infrastructure for our democracy.
          </ColDescription>
          <SubmitButton>Join our Mailing List</SubmitButton>
        </LeftCol>
        <RightCol item xs={12} md={6}>
          <ColTitle>Search Candidates</ColTitle>
          <ColDescription>
            Curious to see other good candidates?
            <br />
          </ColDescription>
          <SubmitButton>Find Candidate</SubmitButton>
        </RightCol>
      </Grid>
    </CreatorsSectionWrapper>
  );
};

export default CreatorsSection;
