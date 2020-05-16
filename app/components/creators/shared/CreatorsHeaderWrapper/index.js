import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import CreatorsDesktopHeader from '../CreatorsDesktopHeader';

const Spacer = styled.div`
  height: 5rem;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 7rem;
    display: block;
  }
`;

const CreatorsHeaderWrapper = ({}) => {
  return (
    <>
      <CreatorsDesktopHeader />
      <Spacer />
    </>
  );
};

CreatorsHeaderWrapper.propTypes = {
  pathname: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  zipCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  navigateCallback: PropTypes.func,
  hideMobileNav: PropTypes.bool,
};

export default CreatorsHeaderWrapper;
