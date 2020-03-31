/**
 *
 * ThreeStepsWrapper
 *
 */

import React, { useState} from 'react';
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
  const [slideNum, setSlideNum] = useState(0);


  const onChange = value => {
    setSlideNum(value);
  };

  const wrapperStyles = () => {
    if (slideNum === 0) {
      return {
        backgroundColor: '#fafafa',
      };
    }
    if (slideNum === 1) {
      return {
        backgroundColor: '#f8fbfb',
      };
    }
    if (slideNum === 2) {
      return {
        backgroundColor: '#f2f9fb',
      };
    }
    return {
      backgroundColor: '#fafafa',
    };
  };
  return (
    <MainWrapper style={wrapperStyles()}>
      <Wrapper style={wrapperStyles()}>
        <CarouselWrapper>
          <IntroCarousel
            handleNextStep={handleNextStep}
            slideChangeCallback={onChange}
          />
        </CarouselWrapper>
      </Wrapper>
    </MainWrapper>
  );
}

ThreeStepsWrapper.propTypes = {
  handleNextStep: PropTypes.func,
};

export default ThreeStepsWrapper;
