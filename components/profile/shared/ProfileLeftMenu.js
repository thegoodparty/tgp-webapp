/**
 *
 * PortalLeftMenu
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { Font16 } from '/components/shared/typogrophy';
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';
import { getUserCookie } from '/helpers/cookieHelper';
import { CONTACT_EMAIL } from '../../../utils/constants';

const LeftPanel = styled.div`
  padding: 0 10px 20px 10px;
  text-align: center;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    width: 220px;
    overflow-x: hidden;
    padding: 60px 10px 0 10px;
    text-align: left;
  }
`;

const Label = styled(Font16)`
  display: inline-block;
  color: #636363;
  padding-right: 20px;
  padding-bottom: 16px;
  &.selected {
    font-weight: 900;
    color: #000;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: block;
    padding-bottom: 40px;
    padding-right: 0;
  }
`;

const Secondary = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    display: block;
  }
`;

export const leftMenuItems = [
  {
    label: 'Profile',
    link: '/profile',
  },
  {
    label: 'Settings',
    link: '/profile/settings',
  },
  {
    label: 'Campaigns',
    link: '/profile/campaigns',
  },
];

export const leftMenuItemsBottom = [
  {
    label: 'FAQs',
    link: '/faqs',
  },
  {
    label: 'Need Help?',
    link: `mailto:${CONTACT_EMAIL}`,
  },
];

function PortalLeftMenu() {
  let pathname = '';
  if (typeof window !== 'undefined') {
    ({ pathname } = window.location);
  }

  return (
    <LeftPanel>
      {leftMenuItems.map((item) => (
        <React.Fragment key={item.label}>
          <Link href={item.link} passHref>
            <a data-cy="portal-left-menu-item">
              <Label className={pathname === item.link ? 'selected' : ''}>
                {item.label}
              </Label>
            </a>
          </Link>
        </React.Fragment>
      ))}
      <Secondary>
        <div style={{ height: '90px' }}>&nbsp;</div>
        {leftMenuItemsBottom.map((item) => (
          <Link href={item.link} passHref key={item.label}>
            <a data-cy="portal-left-menu-bottom-item">
              <Label className={pathname === item.link ? 'selected' : ''}>
                {item.label}
              </Label>
            </a>
          </Link>
        ))}
      </Secondary>
    </LeftPanel>
  );
}

PortalLeftMenu.propTypes = {};

export default memo(PortalLeftMenu);
