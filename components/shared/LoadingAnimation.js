import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { H3 } from './typogrophy';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  flex-direction: column;

  &.full-page {
    height: calc(100vh - 75px - 4rem);
  }
`;

const LoadingAnimation = ({ label, fullPage = true }) => (
  <Wrapper className={fullPage && '.full-page'}>
    {label && (
      <H3>
        {label}
        <br />
        &nbsp;
      </H3>
    )}
    <CircularProgress />
  </Wrapper>
);

LoadingAnimation.propTypes = {
  label: PropTypes.string,
};

export default LoadingAnimation;
