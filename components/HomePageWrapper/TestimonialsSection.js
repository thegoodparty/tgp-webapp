import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const CarouselPrevIcon = '/images/icons/carousel-prev.svg';
const CarouselNextIcon = '/images/icons/carousel-next-gray.svg';

import StyledH2 from './StyledH2';

const Wrapper = styled.div`
  text-align: center;
  padding: 12px 8px;
  position: relative;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: flex;
    align-items: center;
    padding: 16px 40px 16px 12px;
  }
`;

const TextWrapper = styled.div`
  padding: 18px 0 0 32px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    flex: 1;
    text-align: left;
  }
`;

const Name = styled.div`
  margin: 24px 0;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Gray7 = styled.div`
  color: ${({ theme }) => theme.colors.gray7};
`;

const Img = styled.img`
  height: 96px;
  width: 96px;
  border-radius: 50%;
  margin: 0 auto;

  box-shadow: -2px 2px 5px rgba(224, 212, 234, 0.2),
    2px -2px 5px rgba(224, 212, 234, 0.2),
    -2px -2px 5px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(224, 212, 234, 0.9),
    inset 1px 1px 1px rgba(255, 255, 255, 0.3),
    inset -1px -1px 1px rgba(224, 212, 234, 0.5);

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    height: 172px;
    width: 172px;
    margin: 0;
  }
`;

const StyledSlider = styled(Slider)`
  div {
    outline: none;
  }
  .slick-dots {
    bottom: -10px;
    @media only screen and (min-width: ${({ theme }) =>
        theme.breakpointsPixels.md}) {
      bottom: -25px;
    }
  }
  .slick-dots li button:before {
    background-color: ${({ theme }) => theme.colors.grayC};
    content: '';
    height: 5px;
    border-radius: 4px;
  }

  .slick-dots li.slick-active button:before {
    background-color: ${({ theme }) => theme.colors.purple};
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
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: block;
  }
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
  // {
  //   image: 'https://assets.goodparty.org/testimonials/katherine-gehl1.jpg',
  //   content: 'Good Party is making citizens’ votes matter more than money.',
  //   name: 'Katherine Gehl',
  //   title: 'Founder, Institute for Political Innovation',
  // },
  {
    image: 'https://assets.goodparty.org/testimonials/jeff-ayeroff.jpg',
    content: 'Good Party is Rock the Vote on steroids!',
    name: 'Jeff Ayeroff',
    title: 'Founder, Rock the Vote',
  },
  {
    image: 'https://assets.goodparty.org/testimonials/naval-ravikant1.jpg',
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
    dots: true,
    infinite: true,
    // autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <StyledSlider {...settings}>
      {testimonials.map(testimonial => (
        <div key={testimonial.name}>
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
