/**
 *
 * PortalContentTopMenu
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
    background-color: ${({ theme }) => theme.colors.purple};
    color: #fff;
  }
`;

function PortalContentTopMenu({ candidate }) {
  const [pathname, setPathname] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const links = [
    { href: '/candidate-portal/campaign-manager', label: 'Content Manager' },
    { href: '/candidate-portal/campaign-updates', label: 'Campaign Updates' },
    { href: '/candidate-portal/top-issues', label: 'Top Issues' },
  ];
  console.log('path', pathname);
  return (
    <div style={{ marginBottom: '12px' }}>
      <Wrapper>
        {links.map((link, index) => (
          <Link href={link.href} passHref>
            <a>
              <Item
                className={`${index === links.length - 1 &&
                  'last-item'} ${pathname === link.href && 'active'}`}
              >
                {link.label}
              </Item>
            </a>
          </Link>
        ))}
      </Wrapper>
      <br />
      <div className="text-center">
        <a href={candidateRoute(candidate)} target="_blank">
          Your Page on Good Party
        </a>
      </div>
    </div>
  );
}

PortalContentTopMenu.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default PortalContentTopMenu;
