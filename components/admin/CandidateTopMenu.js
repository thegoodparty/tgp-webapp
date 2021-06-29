/**
 *
 * CandidateTopMenu
 *
 */

import React, { useState, useEffect } from 'react';
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
  font-size: 1.1rem;

  &.last-item {
    border-right: none;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.purple};
    color: #fff;
  }
`;

function CandidateTopMenu({ candidate }) {
  const [activeLink, setActiveLink] = useState('edit');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = location;
      if (pathname.includes('candidate-image')) {
        setActiveLink('image');
      } else if (pathname.includes('stage-settings')) {
        setActiveLink('stage');
      } else if (pathname.includes('compare-candidates')) {
        setActiveLink('compare');
      }
    }
  }, []);

  return (
    <Wrapper>
      <Link href={`/admin/add-candidate/${candidate?.id}`} passHref>
        <a>
          <Item className={activeLink === 'edit' && 'active'}>
            Edit Candidate
          </Item>
        </a>
      </Link>
      {candidate?.id && (
        <>
          <Link href={`/admin/candidate-image/${candidate?.id}`} passHref>
            <a>
              <Item className={activeLink === 'image' && 'active'}>
                Candidate Image
              </Item>
            </a>
          </Link>
          <Link href={`/admin/compare-candidates/${candidate?.id}`} passHref>
            <a>
              <Item className={activeLink === 'compare' && 'active'}>
                Compared Candidates
              </Item>
            </a>
          </Link>
          <Link href={`/admin/stage-settings/${candidate?.id}`} passHref>
            <a>
              <Item
                className={
                  activeLink === 'stage' ? 'last-item active' : 'last-item'
                }
              >
                Stage Settings
              </Item>
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
