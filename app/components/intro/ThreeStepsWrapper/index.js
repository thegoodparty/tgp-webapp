/**
 *
 * ThreeStepsWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Wrapper from 'components/shared/Wrapper';
import IntroCarousel from './IntroCarousel';

const CarouselWrapper = styled.div`
  padding: 4vh 0 0;
`;
const MainWrapper = styled.div`
  height: 100vh;
`;

function ThreeStepsWrapper({ handleNextStep }) {
  return (
    <MainWrapper style={{ backgroundColor: '#fff' }}>
      <Wrapper style={{ backgroundColor: '#fff' }}>
        <CarouselWrapper>
          <IntroCarousel handleNextStep={handleNextStep} />
        </CarouselWrapper>
      </Wrapper>
    </MainWrapper>
  );
}

ThreeStepsWrapper.propTypes = {
  handleNextStep: PropTypes.func,
};

export default ThreeStepsWrapper;
