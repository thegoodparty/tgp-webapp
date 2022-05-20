import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 24px;
  position: relative;
  margin-bottom: 10px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    padding: 36px 50px;
  }
`;

const Color = styled.div`
  position: absolute;
  top: 34px;
  left: 0;
  height: 28px;
  width: 7px;
`;

const AdminPanel = ({ children, color = '#2CCDB0' }) => {
  return (
    <Wrapper>
      {color && <Color style={{ backgroundColor: color }} />}
      {children}
    </Wrapper>
  );
};

AdminPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  color: PropTypes.string,
};

export default AdminPanel;
