import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const WrapperDiv = styled.div`
  min-height: calc(100vh - 140px - 400px);
  //min-height: calc(var(--vh, 1vh) * 100 - 140px);
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  background-color: #FAFAFA;
  @media only screen and (min-width: 1280px) {
    padding: 0;
    min-height: calc(100vh - 80px - 400px);
    //min-height: calc(var(--vh, 1vh) * 100 - 40px);
  }
  &.white {
    background-color: #fff;
  }
  &.purple {
    background-color: #F9F7FA;
  }
  &.no-header {
    min-height: calc(100vh);
    //min-height: calc(var(--vh, 1vh) * 100);
    @media only screen and (min-width: 768px) {
      min-height: calc(100vh);
      //min-height: calc(var(--vh, 1vh) * 100);
    }
  }
`;

const Wrapper = ({ children, style, white, purple, noHeader = false }) => {
  // useEffect(() => {
  //   let vh;
  //   if (typeof window !== 'undefined') {
  //     vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);
  //
  //     const handleWindowResize = () => {
  //       vh = window.innerHeight * 0.01;
  //       document.documentElement.style.setProperty('--vh', `${vh}px`);
  //     };
  //
  //     window.addEventListener('resize', handleWindowResize);
  //
  //     return function unmount() {
  //       window.removeEventListener('resize', handleWindowResize);
  //     };
  //   }
  // }, []);
  let className = '';
  if (white) {
    className = 'white';
  }
  if (purple) {
    className = 'purple';
  }
  if (noHeader) {
    className += ' no-header';
  }
  return (
    <WrapperDiv style={style} className={className}>
      {children}
    </WrapperDiv>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  white: PropTypes.bool,
  noHeader: PropTypes.bool,
};

export default Wrapper;
