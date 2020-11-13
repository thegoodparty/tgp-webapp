import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const WrapperDiv = styled.div`
  min-height: calc(100vh - 140px);
  min-height: calc(var(--vh, 1vh) * 100 - 140px);
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 0 16px 0;
  background-color: ${({ theme }) => theme.colors.grayBg};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
    min-height: calc(100vh - 40px);
    min-height: calc(var(--vh, 1vh) * 100 - 40px);
  }

  &.white {
    background-color: #fff;
  }
  &.no-header {
    min-height: calc(100vh);
    min-height: calc(var(--vh, 1vh) * 100);
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      min-height: calc(100vh);
      min-height: calc(var(--vh, 1vh) * 100);
    }
  }
`;

const Wrapper = ({ children, style, white, noHeader = false }) => {
  useEffect(() => {
    let vh;
    if (typeof window !== 'undefined') {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      const handleWindowResize = () => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      window.addEventListener('resize', handleWindowResize);

      return function unmount() {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, []);
  let className = '';
  if (white) {
    className = 'white';
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
