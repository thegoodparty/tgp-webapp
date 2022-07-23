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
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';
import { getUserCookie } from '/helpers/cookieHelper';

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
    label: 'Analytics Dashboard',
    link: '/candidate-portal',
    minAccessLevel: ACCESS_ENUM.STAFF,
  },
  {
    label: 'Campaign Page & Info',
    link: '/candidate-portal/campaign-manager',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  // {
  //   label: 'Campaign Updates',
  //   link: '/candidate-portal/campaign-updates',
  //   minAccessLevel: ACCESS_ENUM.MANAGER,
  // },
  {
    label: 'Policy Issues',
    link: '/candidate-portal/top-issues',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  {
    label: 'Key Endorsers',
    link: '/candidate-portal/endorsements',
    minAccessLevel: ACCESS_ENUM.MANAGER,
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
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
];

export const leftMenuItemsBottom = [
  {
    label: 'Campaign Guide',
    link: '/run#how',
  },
  {
    label: 'FAQs',
    link: '/faqs',
  },
  {
    label: 'Need Help?',
    link: 'mailto:politics@goodparty.org',
  },
];

function PortalLeftMenu({ id, role }) {
  let pathname = '';
  if (typeof window !== 'undefined') {
    ({ pathname } = window.location);
  }

  const link = (itemLink) => `${itemLink}/${id}`;

  const user = getUserCookie(true);

  const access = accessLevel(role);

  return (
    <LeftPanel>
      {leftMenuItems.map((item) => (
        <React.Fragment key={item.label}>
          {access >= item.minAccessLevel && (
            <Link href={link(item.link)} passHref>
              <a>
                <Label
                  className={pathname === link(item.link) ? 'selected' : ''}
                >
                  {item.label}
                </Label>
              </a>
            </Link>
          )}
        </React.Fragment>
      ))}
      <Secondary>
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
      </Secondary>
    </LeftPanel>
  );
}

PortalLeftMenu.propTypes = {
  id: PropTypes.string,
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default memo(PortalLeftMenu);
