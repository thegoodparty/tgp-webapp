/**
 *
 * AdminMenu
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import heartImg from 'images/heart.svg';

const MenuWrapper = styled.div`
  position: absolute;
  z-index: 2001;
  top: 10px;
  right: 10px;
`;

const HeartWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.07), 0px 0px 12px rgba(0, 0, 0, 0.08),
    0px 0px 16px rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Heart = styled.img`
  width: 30px;
  height: auto;
`;

function AdminMenu() {
  return (
    <>
      <MenuWrapper>
        <Link to="/admin">
          <HeartWrapper>
            <Heart src={heartImg} alt="admin menu" />
          </HeartWrapper>
        </Link>
      </MenuWrapper>
    </>
  );
}

AdminMenu.propTypes = {};

export default memo(AdminMenu);
