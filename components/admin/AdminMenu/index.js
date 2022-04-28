/**
 *
 * AdminMenu
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { FaUserEdit } from 'react-icons/fa';

const MenuWrapper = styled.div`
  margin-left: 24px;
`;

const HeartWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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

function AdminMenu({ candidateMode, id }) {
  return (
    <>
      <MenuWrapper>
        <Link
          href={candidateMode && id ? `/candidate-portal/${id}` : '/admin'}
          passHref
        >
          <a>
            <HeartWrapper>
              {candidateMode && id ? (
                <FaUserEdit />
              ) : (
                <Heart src="/images/heart.svg" alt="admin menu" />
              )}
            </HeartWrapper>
          </a>
        </Link>
      </MenuWrapper>
    </>
  );
}

AdminMenu.propTypes = {
  candidateMode: PropTypes.bool,
};

export default memo(AdminMenu);
