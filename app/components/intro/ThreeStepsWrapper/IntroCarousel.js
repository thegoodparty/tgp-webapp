import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BlueButton } from 'components/shared/buttons';
import slide1 from 'images/slider1.jpg';
import slide2 from 'images/slider2.jpg';
import slide3 from 'images/slider3.jpg';

const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 10%;

  .slick-prev:before,
  .slick-next:before {
    color: #000 !important;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer: cursor;

  &:focus {
    outline: none !important;
  }
`;

const SliderImg = styled.div`
  width: 100%;
  height: 50vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  &:focus {
    outline: none !important;
  }
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
  margin: 16px auto;
  text-align: center;
`;

const IntroCarousel = ({
  showButton = true,
  slideChangeCallback = () => {},
  handleNextStep = () => {},
}) => {
  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      slideChangeCallback(newIndex);
    },
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  return (
    <Wrapper>
      <Slider {...settings} ref={sliderRef}>
        <SliderWrapper onClick={next}>
          <SlideTitle>
            <Circled>1</Circled>
            <span>SHOW GOOD CANDIDATES</span>
          </SlideTitle>
          <SliderImg
            style={{
              backgroundImage: `url(${slide1})`,
            }}
          />
        </SliderWrapper>
        <SliderWrapper onClick={next}>
          <SlideTitle>
            <Circled>2</Circled>
            <span>PRE-COUNT NEEDED VOTES</span>
          </SlideTitle>
          <SliderImg
            style={{
              backgroundImage: `url(${slide2})`,
            }}
          />
        </SliderWrapper>
        <SliderWrapper onClick={handleNextStep}>
          <SlideTitle>
            <Circled>3</Circled>
            <span>VOTE OR WRITE IN, FTW!</span>
          </SlideTitle>
          <SliderImg
            style={{
              backgroundImage: `url(${slide3})`,
            }}
          />
          {showButton && (
            <ButtonWrapper>
              <BlueButton onClick={handleNextStep} fullWidth>
                SEE YOUR ELECTIONS
              </BlueButton>
            </ButtonWrapper>
          )}
        </SliderWrapper>
      </Slider>
    </Wrapper>
  );
};

IntroCarousel.propTypes = {
  showButton: PropTypes.bool,
  slideChangeCallback: PropTypes.func,
  handleNextStep: PropTypes.func,
};

export default IntroCarousel;
