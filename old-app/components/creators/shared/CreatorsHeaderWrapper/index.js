import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreatorsDesktopHeader from '../CreatorsDesktopHeader';

const Spacer = styled.div`
  height: 5rem;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 7rem;
    display: block;
  }
`;

const CreatorsHeaderWrapper = ({ toggleJoin, user }) => {
  return (
    <>
      <CreatorsDesktopHeader toggleJoin={toggleJoin} user={user} />
      <Spacer />
    </>
  );
};

CreatorsHeaderWrapper.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  toggleJoin: PropTypes.func,
};

export default CreatorsHeaderWrapper;
