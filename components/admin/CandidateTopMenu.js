/**
 *
 * CandidateTopMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  background-color: #eee;
  padding: 12px 36px;
  border-right: solid 1px #ccc;
  cursor: pointer;
  font-size: 1.3rem;

  &.last-item {
    border-right: none;
  }
`;

function CandidateTopMenu({ candidate }) {
  return (
    <Wrapper>
      <Link href={`/admin/add-candidate/${candidate?.id}`} passHref>
        <a>
          <Item>Edit Candidate</Item>
        </a>
      </Link>
      {candidate?.id && (
        <>
          <Link href={`/admin/candidate-image/${candidate?.id}`} passHref>
            <a>
              <Item className="last-item">Candidate Image</Item>
            </a>
          </Link>
          <Link href={`/admin/stage-settings/${candidate?.id}`} passHref>
            <a>
              <Item className="last-item">Stage Settings</Item>
            </a>
          </Link>
        </>
      )}
    </Wrapper>
  );
}

CandidateTopMenu.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default CandidateTopMenu;
