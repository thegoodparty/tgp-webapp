import React, { useEffect } from 'react';
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
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 16px 0;
    min-height: calc(100vh - 40px);
  }
`;

const Wrapper = ({
  children,
  style,
  white,
  noHeader = false,
  creators = false,
}) => {
  let className = '';
  if (white) {
    className = 'white';
  }
  return (
    <WrapperDiv style={style} className={className} creators={creators}>
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
