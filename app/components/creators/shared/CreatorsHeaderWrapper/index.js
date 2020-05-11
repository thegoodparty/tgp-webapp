import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CreatorsDesktopHeader from '../CreatorsDesktopHeader';

const useStyles = makeStyles(theme => ({
  appbar: {
    margin: 0,
  },
  bar: {
    justifyContent: 'space-between',
  },
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1000,
    backgroundColor: '#FFF',
    fontWeight: 500,
    boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.1)',
    paddingBottom: '5px',
    height: '66px',
  },
  bottomNavItem: {
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
}));

const CreatorsHeaderWrapper = ({}) => {
  const classes = useStyles();
  return (
    <>
      <Hidden smDown>
        <CreatorsDesktopHeader />
      </Hidden>
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
