import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';

const Wrapper = styled.span``;

const Inner = styled.div`
  padding: 20px;
  position: relative;
  max-width: 320px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    min-width: 580px;
    max-width: 700px;
  }
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-bottom: 10px solid #fff;
  position: absolute;
  top: -10px;
  left: calc(50% - 10px);
`;

const Tooltip = ({ children, triggerEl }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Wrapper>
      <span
        onClick={handleClick}
        aria-describedby={id}
        style={{ display: 'inline-block' }}
      >
        {triggerEl}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ marginTop: '20px' }}
        PaperProps={{ style: { borderRadius: '12px' } }}
      >
        <Inner>
          {/*<ArrowShadow />*/}
          <Arrow />
          {children}
        </Inner>
      </Popover>
    </Wrapper>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  triggerEl: PropTypes.node,
};

export default Tooltip;
