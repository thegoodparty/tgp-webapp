import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const WrapperDiv = styled.div`
  min-height: calc(100vh - 140px);
  //min-height: calc(var(--vh, 1vh) * 100 - 140px);
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.colors.grayBg};
  @media only screen and (min-width: ${({ theme }) =>
    theme.breakpointsPixels.contentMax}) {
    padding: 0;
    min-height: calc(100vh - 40px);
    //min-height: calc(var(--vh, 1vh) * 100 - 40px);
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpointsPixels.lg}) {
    padding-right: 24px;
    padding-left: 24px;
  }
  @media only screen and (max-width: ${({ theme }) =>
    theme.breakpointsPixels.sm}) {
    padding-right: 18px;
    padding-left: 18px;
  }
  &.white {
    background-color: #fff;
  }
  &.purple {
    background-color: ${({ theme }) => theme.colors.purple3};
  }
  &.no-header {
    min-height: calc(100vh);
    //min-height: calc(var(--vh, 1vh) * 100);
    @media only screen and (min-width: ${({ theme }) =>
    theme.breakpointsPixels.md}) {
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
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.object,
  white: PropTypes.bool,
  noHeader: PropTypes.bool,
};

export default Wrapper;
