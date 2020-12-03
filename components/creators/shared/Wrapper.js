import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const WrapperDiv = styled.div`
  min-height: calc(100vh - 140px);
  max-width: ${({ theme }) => theme.creators.breakpoints.creatorsContent};
  margin: 0 auto;
  padding: 0 16px 0;
  background-color: ${({ theme }) => theme.colors.grayBg};
  &.white {
    background-color: #fff;
  }
  &.blue {
    padding: 0 0 16px 0;
    background-color: ${({ theme }) => theme.colors.blue};
    max-width: none;
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
    min-height: calc(100vh - 40px);
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.creators.breakpoints.creatorsContent}) {
    padding: 1rem 0 0;
  }
`;

const Wrapper = ({ children, style, white, blue }) => {
  let className = '';
  if (white) {
    className = 'white';
  } else if (blue) {
    className = 'blue';
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
  blue: PropTypes.bool,
};

export default Wrapper;
