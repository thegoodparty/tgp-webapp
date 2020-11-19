/**
 *
 * AdminMenuEditCandidate
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import EditIcon from '@material-ui/icons/Edit';

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 2002;
  top: 10px;
  right: 60px;
`;

const EditWrapper = styled.div`
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



function AdminMenuEditCandidate({ candidate }) {
  const chamberLower = candidate.chamber
    ? candidate.chamber.toLowerCase()
    : 'presidential';
  const editRoute = `/admin/edit-candidate/${chamberLower}${
    candidate.isIncumbent ? '-i' : ''
  }/${candidate.id}`;
  return (
    <>
      <MenuWrapper>
        <Link href={editRoute}>
          <EditWrapper>
            <EditIcon />
          </EditWrapper>
        </Link>
      </MenuWrapper>
    </>
  );
}

AdminMenuEditCandidate.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default memo(AdminMenuEditCandidate);
