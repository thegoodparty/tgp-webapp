import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselPrevIcon = '/images/icons/carousel-prev.svg';
const CarouselNextIcon = '/images/icons/carousel-next-gray.svg';

import StyledH2 from './StyledH2';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 40px 16px 0;
  position: relative;
`;

const TextWrapper = styled.div`
  padding: 18px 0 0 32px;
`;

const Name = styled.div`
  margin-top: 24px;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Gray7 = styled.div`
  color: ${({ theme }) => theme.colors.gray7};
`;

const Img = styled.img`
  height: 100px;
  width: 100px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: 212px;
    width: 212px;
  }
`;

const StyledSlider = styled(Slider)`
  div {
    outline: none;
  }
`;

const PrevArrowElem = styled.div`
display: none;
/*
  left: calc(-50vw + 18px);
  top: 35px;
  @media only screen and (min-width: ${({ theme }) =>
    theme.breakpointsPixels.md}) {
    left: -280px;
    top: 150px;
  }
  &.slick-disabled {
    display: none;
  }
  &::before {
    display: none;
  }

 */
`;

const NextArrowElem = styled.div`
  top: 120px;
  &::before {
    display: none;
  }
  right: 20px;
  &.slick-disabled {
    display: none;
  }
  &::before {
    display: none;
  }
`;

const testimonials = [
  {
    image: 'https://assets.goodparty.org/testimonials/katherine-gehl.png',
    content: 'Good Party is making citizens’ votes matter more than money.',
    name: 'Katherine Gehl',
    title: 'Founder, Institute for Political Innovation',
  },
  {
    image: 'https://assets.goodparty.org/testimonials/naval-ravikant.png',
    content:
      'Outside of Good Party hacks like crowd-voting, you’re never going to get an independent or 3rd party elected.',
    name: 'Naval Ravikant',
    title: 'Founder and Chairman, AngelList',
  },
];

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <PrevArrowElem className={className} onClick={onClick}>
      {/*<img src={CarouselPrevIcon} alt="carousel-prev" />*/}
    </PrevArrowElem>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <NextArrowElem className={className} onClick={onClick}>
      <img src={CarouselNextIcon} alt="carousel-next" />
    </NextArrowElem>
  );
}

const TestimonialsSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <StyledSlider {...settings}>
      {testimonials.map(testimonial => (
        <div>
          <Wrapper key={testimonial.name}>
            <Img src={testimonial.image} alt={testimonial.name} />
            <TextWrapper>
              <StyledH2>&ldquo;{testimonial.content}&rdquo;</StyledH2>
              <Name>
                {testimonial.name}
                <br />
                <Gray7>{testimonial.title}</Gray7>
              </Name>
            </TextWrapper>
          </Wrapper>
        </div>
      ))}
    </StyledSlider>
  );
};

export default TestimonialsSection;