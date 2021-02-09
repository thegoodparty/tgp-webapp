/**
 *
 * ComparedCandidateCarousel
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import CompareCandidate from './CompareCandidate.js';
const CarouselPrevIcon = '/images/carousel-prev.png';
const CarouselNextIcon = '/images/carousel-next.png';


const ComparedCandidateWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;
const CarouselWrapper = styled(Grid)`
  && {
    width: 10000px;
    flex-wrap: nowrap;
    padding-left: 27px;
  }
`;

function ComparedCandidateCarousel({ candidates }) {
  const [carouselPos, setCarouselPos] = useState(0);
  return (
    <>
      {carouselPos > 0 && (
        <span
          className="carousel-prev"
          onClick={() => setCarouselPos(carouselPos - 1)}
        >
          <img src={CarouselPrevIcon} alt="carousel-prev" />
        </span>
      )}
      {carouselPos < candidates?.length - 1 && (
        <span
          className="carousel-next"
          onClick={() => setCarouselPos(carouselPos + 1)}
        >
          <img src={CarouselNextIcon} alt="carousel-next" />
        </span>
      )}
      <ComparedCandidateWrapper>
        <CarouselWrapper container>
          {candidates &&
            candidates.map((cand, index) =>
              index >= carouselPos ? (
                <CompareCandidate candidate={cand} />
              ) : (
                <></>
              ),
            )}
        </CarouselWrapper>
      </ComparedCandidateWrapper>
    </>
  );
}

ComparedCandidateCarousel.propTypes = {
  candidates: PropTypes.array,
};

export default ComparedCandidateCarousel;
