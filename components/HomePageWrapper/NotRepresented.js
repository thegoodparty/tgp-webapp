import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image';

const Wrapper = styled.div`
  padding: 100px 20px 80px;
  background: url('https://assets.goodparty.org/homepage/not-represented.svg')
    top center no-repeat;
    background-size: 100% 100%;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const NotRepresented = () => {
  return (
    <Wrapper>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          123
        </Grid>
      </Grid>
    </Wrapper>
  );
};

NotRepresented.propTypes = {};

export default NotRepresented;
