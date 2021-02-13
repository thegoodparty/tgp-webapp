/**
 *
 * ComparedCandidateCarousel
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CarouselPrevIcon = '/images/carousel-prev.png';
const CarouselNextIcon = '/images/carousel-next.png';
import CompareCandidate from './CompareCandidate';

const StyledSlider = styled(Slider)`
  div {
    outline: none;
  }
`;

const PrevArrowElem = styled.div`
  left: -220px;
  top: 150px;
  &.slick-disabled {
    display: none;
  }
`;

const NextArrowElem = styled.div`
  top: 150px;
  &.slick-disabled {
    display: none;
  }
`;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <PrevArrowElem className={className} onClick={onClick}>
      <img src={CarouselPrevIcon} alt="carousel-prev" />
    </PrevArrowElem>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <NextArrowElem className={className} onClick={onClick}>
      <img src={CarouselNextIcon} alt="carousel-prev" />
    </NextArrowElem>
  );
}

function ComparedCandidateCarousel({ candidates }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  if (!candidates || candidates.length === 0) {
    return <></>;
  }
  const compared = [...candidates];
  compared.shift();
  return (
    <Grid container>
      <Grid item xs={4}>
        <CompareCandidate candidate={candidates[0]} />
      </Grid>
      <Grid item xs={8}>
        <StyledSlider {...settings}>
          {compared.map(cand => (
            <div key={cand.id}>
              <CompareCandidate candidate={cand} />
            </div>
          ))}
        </StyledSlider>
      </Grid>
    </Grid>
  );
}

ComparedCandidateCarousel.propTypes = {
  candidates: PropTypes.array,
};

export default ComparedCandidateCarousel;
