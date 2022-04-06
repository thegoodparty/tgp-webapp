import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';

const Inner = styled.div`
  padding: 20px;
  position: relative;
  max-width: 320px;
`;

const ArrowShadow = styled.div`
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;

  border-bottom: 12px solid #ccc;
  position: absolute;
  top: -12px;
  left: calc(50% - 12px);
  filter: blur(6px);
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
    <div>
      <div onClick={handleClick} aria-describedby={id}>
        {triggerEl}
      </div>
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
      >
        <Inner>
          <ArrowShadow />
          <Arrow />
          {children}
        </Inner>
      </Popover>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  triggerEl: PropTypes.node,
};

export default Tooltip;
