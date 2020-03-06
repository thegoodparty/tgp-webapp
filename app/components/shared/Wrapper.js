import React, { useEffect } from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
  min-height: calc(100vh);
  min-height: calc(var(--vh, 1vh) * 100);
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 0 16px 4rem;
  background-color: ${({ theme }) => theme.colors.grayBg};
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4rem 16px 0;
  }

  &.white {
    background-color: #fff;
  }
`;

const Wrapper = ({ children, style, white }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      window.addEventListener('resize', () => {
        // We execute the same script as before
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }
  }, []);
  return (
    <WrapperDiv style={style} className={white ? 'white' : ''}>
      {children}
    </WrapperDiv>
  );
};

export default Wrapper;
