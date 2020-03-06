/**
 *
 * ThreeStepsWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '@brainhubeu/react-carousel/lib/style.css';
import IntroCarousel from './IntroCarousel';
import Wrapper from '../../shared/Wrapper';

const CarouselWrapper = styled.div`
  padding: 4vh 0 0;
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
    <div style={wrapperStyles()}>
      <Wrapper style={wrapperStyles()}>
        <CarouselWrapper>
          <IntroCarousel
            handleNextStep={handleNextStep}
            slideChangeCallback={onChange}
          />
        </CarouselWrapper>
      </Wrapper>
    </div>
  );
}

ThreeStepsWrapper.propTypes = {
  handleNextStep: PropTypes.func,
};

export default ThreeStepsWrapper;
