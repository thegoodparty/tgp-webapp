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
import { logEvent } from 'services/AnalyticsService';

import CompareCandidate from './CompareCandidate';
import TooltipModal from './TooltipModal';

const CarouselPrevIcon = '/images/icons/carousel-prev.svg';
const CarouselNextIcon = '/images/icons/carousel-next.svg';

const StyledSlider = styled(Slider)`
  div {
    outline: none;
  }
`;

const PrevArrowElem = styled.div`
  left: calc(-50vw + 18px);
  top: 35px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    left: -305px;
    top: 160px;
  }
  &.slick-disabled {
    display: none;
  }
  &::before {
    display: none;
  }
`;

const NextArrowElem = styled.div`
  top: 35px;
  &::before {
    display: none;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    top: 160px;
  }
  right: 20px;
  &.slick-disabled {
    display: none;
  }
  &::before {
    display: none;
  }
`;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  const handleClick = () => {
    logEvent('click', 'Carousel Prev button', 'Candidate Carousel');
    onClick();
  };
  return (
    <PrevArrowElem className={className} onClick={handleClick}>
      <img src={CarouselPrevIcon} alt="carousel-prev" />
    </PrevArrowElem>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  const handleClick = () => {
    logEvent('click', 'Carousel Next button', 'Candidate Carousel');
    onClick();
  };
  return (
    <NextArrowElem className={className} onClick={handleClick}>
      <img src={CarouselNextIcon} alt="carousel-next" />
    </NextArrowElem>
  );
}

function ComparedCandidateCarousel({ candidates, candidate, topics }) {
  const [tooltipTopic, setTooltipTopic] = useState(false);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  if (!candidates || candidates.length === 0) {
    return <></>;
  }
  const compared = [...candidates];
  compared.shift();

  const handleSetTopic = topic => {
    setTooltipTopic(topic);
  };
  console.log('candidate', candidate);
  return (
    <Grid container>
      <Grid item xs={6}>
        <CompareCandidate
          candidate={candidates[0]}
          setTopicCallback={handleSetTopic}
          partyBadge
          hideBadge={candidate.isDraft}
        />
      </Grid>
      <Grid item xs={6}>
        <StyledSlider {...settings}>
          {compared.map(cand => (
            <div key={cand.name}>
              <CompareCandidate
                candidate={cand}
                setTopicCallback={handleSetTopic}
              />
            </div>
          ))}
        </StyledSlider>
      </Grid>
      <TooltipModal
        topic={tooltipTopic}
        closeModalCallback={() => setTooltipTopic(false)}
        topics={topics}
      />
    </Grid>
  );
}

ComparedCandidateCarousel.propTypes = {
  candidates: PropTypes.array,
  candidate: PropTypes.object,
  topics: PropTypes.object,
};

export default ComparedCandidateCarousel;
