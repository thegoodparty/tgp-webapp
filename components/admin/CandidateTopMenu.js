/**
 *
 * CandidateTopMenu
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { candidateRoute } from '../../helpers/electionsHelper';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  background-color: #eee;
  padding: 14px 8px;
  border-right: solid 1px #ccc;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  width: 213px;

  &.last-item {
    border-right: none;
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
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
      } else if (pathname.includes('updates')) {
        setActiveLink('updates');
      }
    }
  }, []);

  return (
    <div style={{ marginBottom: '12px' }}>
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
            <Link href={`/admin/candidate-updates/${candidate?.id}`} passHref>
              <a>
                <Item className={activeLink === 'updates' && 'active'}>
                  Candidate Updates
                </Item>
              </a>
            </Link>
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
      <br />
      <a href={candidateRoute(candidate)} target="_blank" rel="noreferrer">
        Candidate Page
      </a>
    </div>
  );
}

CandidateTopMenu.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default CandidateTopMenu;
