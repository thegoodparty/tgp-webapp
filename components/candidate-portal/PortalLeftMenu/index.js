/**
 *
 * PortalLeftMenu
 *
 */

import React, { memo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/ChevronLeft';
import OpenIcon from '@material-ui/icons/ChevronRight';

import { AiOutlineNotification } from 'react-icons/ai';
import { ImEmbed2 } from 'react-icons/im';
import { BiHomeHeart } from 'react-icons/bi';
import { IoIosContact } from 'react-icons/io';
import { MdUpdate } from 'react-icons/md';
import { GoIssueClosed } from 'react-icons/go';
import { FaUsersCog, FaThumbsUp } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';

import { Body13 } from '/components/shared/typogrophy/index';
import { ACCESS_ENUM, accessLevel } from '/helpers/staffHelper';
import { getUserCookie } from '/helpers/cookieHelper';

const LeftPanel = styled.div`
  width: 250px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.07), 0 0 12px rgba(0, 0, 0, 0.08),
    0 0 16px rgba(0, 0, 0, 0.12);
  overflow-x: hidden;
  transition: 0.3s width;

  &.close {
    width: 48px;
  }
`;

const LeftMenuItem = styled(MenuItem)`
  && {
    padding: 16px 12px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
    color: ${({ theme }) => theme.colors.blue};
    &.selected {
      background-color: ${({ theme }) => theme.colors.lighterBlue};
    }
  }
`;

const CloseWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const Icon = styled.span`
  margin-right: 12px;
`;

const IconLabel = styled(Body13)`
  display: inline-block;
`;

export const leftMenuItems = [
  {
    icon: <BiHomeHeart size={24} />,
    label: 'Portal Home',
    link: '/candidate-portal',
    minAccessLevel: ACCESS_ENUM.STAFF,
  },
  {
    icon: <IoIosContact size={24} />,
    label: 'Basic Info',
    link: '/candidate-portal/campaign-manager',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  {
    icon: <MdUpdate size={24} />,
    label: 'Campaign Updates',
    link: '/candidate-portal/campaign-updates',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  {
    icon: <GoIssueClosed size={24} />,
    label: 'Top Issues',
    link: '/candidate-portal/top-issues',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  {
    icon: <FaThumbsUp size={24} />,
    label: 'Endorsements',
    link: '/candidate-portal/endorsements',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  {
    icon: <ImEmbed2 size={24} />,
    label: 'Embed Button',
    link: '/candidate-portal/embed',
    minAccessLevel: ACCESS_ENUM.STAFF,
  },
  {
    icon: <AiOutlineNotification size={24} />,
    label: 'Notification',
    link: '/candidate-portal/campaign-notification',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
  {
    icon: <FaUsersCog size={24} />,
    label: 'Staff Management',
    link: '/candidate-portal/staff-management',
    minAccessLevel: ACCESS_ENUM.MANAGER,
  },
];
function PortalLeftMenu({ id, role }) {
  const [leftOpen, setLeftOpen] = useState(true);
  const toggleLeftPanel = () => {
    setLeftOpen(!leftOpen);
  };
  let pathname = '';
  if (typeof window !== 'undefined') {
    ({ pathname } = window.location);
  }

  const link = (itemLink) => `${itemLink}/${id}`;

  const access = accessLevel(role);

  const user = getUserCookie(true);

  return (
    <LeftPanel className={leftOpen ? 'open' : 'close'}>
      <LeftMenuItem onClick={toggleLeftPanel}>
        <CloseWrapper>{leftOpen ? <CloseIcon /> : <OpenIcon />}</CloseWrapper>
      </LeftMenuItem>
      {leftMenuItems.map((item) => (
        <React.Fragment key={item.label}>
          {access >= item.minAccessLevel && (
            <Link href={link(item.link)} passHref>
              <a>
                <LeftMenuItem
                  className={pathname === link(item.link) ? 'selected' : ''}
                >
                  <Icon>{item.icon}</Icon>
                  <IconLabel>{item.label}</IconLabel>
                </LeftMenuItem>
              </a>
            </Link>
          )}
        </React.Fragment>
      ))}
      {user?.isAdmin && (
        <Link href={link('/candidate-portal/admin')} passHref>
          <a>
            <LeftMenuItem
              className={
                pathname === link('/candidate-portal/admin') ? 'selected' : ''
              }
            >
              <Icon>
                <GrUserAdmin size={24} />
              </Icon>
              <IconLabel>Admin</IconLabel>
            </LeftMenuItem>
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
