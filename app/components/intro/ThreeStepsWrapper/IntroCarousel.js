import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { BlueButton } from 'components/shared/buttons';
import slide1 from 'images/slider1.jpg';
import slide2 from 'images/slider2.jpg';
import slide3 from 'images/slider3.jpg';

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LeftArrow = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
`;

const RightArrow = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  left: 50%;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SliderImg = styled.div`
  width: 100%;
  height: 60vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

const SlideTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.25px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Circled = styled.div`
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: solid 2px ${({ theme }) => theme.colors.gray4};
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  margin-right: 8px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 24px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 2rem;
    padding: 0 30px;
  }
`;
const IntroCarousel = ({
  showButton = true,
  slideChangeCallback = () => {},
  handleNextStep = () => {},
}) => {
  const [slideNum, setSlideNum] = useState(0);

  const onChange = value => {
    setSlideNum(value);
    slideChangeCallback(value);
  };

  const slides = [
    <SliderWrapper>
      <SlideTitle>
        <Circled>1</Circled>
        <span>SHOW GOOD CANDIDATES</span>
      </SlideTitle>
      <SliderImg
        style={{
          backgroundImage: `url(${slide1})`,
        }}
      />
    </SliderWrapper>,
    <SliderWrapper>
      <SlideTitle>
        <Circled>2</Circled>
        <span>COUNT NEEDED VOTES</span>
      </SlideTitle>
      <SliderImg
        style={{
          backgroundImage: `url(${slide2})`,
        }}
      />
    </SliderWrapper>,
    <SliderWrapper>
      <SlideTitle>
        <Circled>3</Circled>
        <span>VOTE OR WRITE IN, FTW!</span>
      </SlideTitle>
      <SliderImg
        style={{
          backgroundImage: `url(${slide3})`,
        }}
      />
    </SliderWrapper>,
  ];
  return (
    <CarouselWrapper>
      <Carousel
        autoPlay={4000}
        animationSpeed={1000}
        onChange={onChange}
        value={slideNum}
        slides={slides}
        arrowLeft={<LeftArrow />}
        arrowRight={<RightArrow />}
        addArrowClickHandler
        stopAutoPlayOnHover
      />

      {Dots && (
        <Dots value={slideNum} onChange={onChange} number={slides.length} />
      )}
      {showButton && slideNum === 2 && (
        <ButtonWrapper>
          <BlueButton onClick={handleNextStep} fullWidth>
            SEE YOUR ELECTIONS
          </BlueButton>
        </ButtonWrapper>
      )}
    </CarouselWrapper>
  );
};

IntroCarousel.propTypes = {
  showButton: PropTypes.bool,
  slideChangeCallback: PropTypes.func,
  handleNextStep: PropTypes.func,
};

export default IntroCarousel;
