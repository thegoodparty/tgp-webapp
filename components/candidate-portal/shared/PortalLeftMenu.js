/**
 *
 * PortalLeftMenu
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';

import { Font16 } from '/components/shared/typogrophy';
import { accessLevel } from '/helpers/staffHelper';
import { getUserCookie } from '/helpers/cookieHelper';

const LeftPanel = styled.div`
  width: 220px;
  overflow-x: hidden;
  padding-top: 60px;
`;

const Label = styled(Font16)`
  color: #636363;
  padding-bottom: 40px;
  &.selected {
    font-weight: 900;
    color: #000;
  }
`;

export const leftMenuItems = [
  {
    label: 'Analytics Dashboard',
    link: '/candidate-portal',
  },
  {
    label: 'Contact Info',
    link: '/candidate-portal/campaign-manager',
  },
  {
    label: 'Campaign Updates',
    link: '/candidate-portal/campaign-updates',
  },
  {
    label: 'Policy Issues',
    link: '/candidate-portal/top-issues',
  },
  {
    label: 'Key Endorsers',
    link: '/candidate-portal/endorsements',
  },
  // {
  //   icon: <ImEmbed2 size={24} />,
  //   label: 'Embed Button',
  //   link: '/candidate-portal/embed',
  //   minAccessLevel: ACCESS_ENUM.STAFF,
  // },
  // {
  //   icon: <AiOutlineNotification size={24} />,
  //   label: 'Notification',
  //   link: '/candidate-portal/campaign-notification',
  //   minAccessLevel: ACCESS_ENUM.MANAGER,
  // },
  {
    label: 'Invite Team Members',
    link: '/candidate-portal/staff-management',
  },
];

export const leftMenuItemsBottom = [
  {
    label: 'Campaign Guide',
    link: '/',
  },
  {
    label: 'FAQs',
    link: '/faqs',
  },
  {
    label: 'Need Help?',
    link: '/',
  },
];

function PortalLeftMenu({ id, role }) {
  let pathname = '';
  if (typeof window !== 'undefined') {
    ({ pathname } = window.location);
  }

  const link = (itemLink) => `${itemLink}/${id}`;

  const access = accessLevel(role);

  const user = getUserCookie(true);

  return (
    <LeftPanel>
      {leftMenuItems.map((item) => (
        <Link href={link(item.link)} passHref key={item.label}>
          <a>
            <Label className={pathname === link(item.link) ? 'selected' : ''}>
              {item.label}
            </Label>
          </a>
        </Link>
      ))}
      <div style={{ height: '90px' }}>&nbsp;</div>
      {leftMenuItemsBottom.map((item) => (
        <Link href={item.link} passHref key={item.label}>
          <a>
            <Label className={pathname === link(item.link) ? 'selected' : ''}>
              {item.label}
            </Label>
          </a>
        </Link>
      ))}
      {user?.isAdmin && (
        <Link href={link('/candidate-portal/admin')} passHref>
          <a>
            <Label
              className={
                pathname === link('/candidate-portal/admin') ? 'selected' : ''
              }
            >
              Admin
            </Label>
          </a>
        </Link>
      )}
    </LeftPanel>
  );
}

PortalLeftMenu.propTypes = {
  id: PropTypes.string,
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default memo(PortalLeftMenu);
