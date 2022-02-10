/**
 *
 * AdminLeftMenu
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import MenuItem from '@material-ui/core/MenuItem';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CloseIcon from '@material-ui/icons/ChevronLeft';
import OpenIcon from '@material-ui/icons/ChevronRight';
import UserIcon from '@material-ui/icons/Person';
import ArticletIcon from '@material-ui/icons/Assignment';
import StatsIcon from '@material-ui/icons/Equalizer';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CompareIcon from '@material-ui/icons/Compare';
import { GiPortal } from 'react-icons/gi';

import { Body13 } from '/components/shared/typogrophy/index';

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
    icon: <AccountBalanceIcon />,
    label: 'Candidates',
    link: '/admin/candidates',
  },
  { icon: <UserIcon />, label: 'Users', link: '/admin/users' },
  {
    icon: <GiPortal size={24} />,
    label: 'Candidates Requests',
    link: '/admin/update-requests',
  },
  { icon: <CompareIcon />, label: 'Topics', link: '/admin/topics' },
  { icon: <ArticletIcon />, label: 'Articles', link: '/admin/articles' },
  { icon: <NewReleasesIcon />, label: 'Releases', link: '/admin/releases' },
  { icon: <StatsIcon />, label: 'User Stats', link: '/admin/user-stats' },
];
function AdminLeftMenu() {
  const [leftOpen, setLeftOpen] = useState(false);
  const toggleLeftPanel = () => {
    setLeftOpen(!leftOpen);
  };
  let pathname = '';
  if (typeof window !== 'undefined') {
    ({ pathname } = window.location);
  }

  return (
    <LeftPanel className={leftOpen ? 'open' : 'close'}>
      <LeftMenuItem onClick={toggleLeftPanel}>
        <CloseWrapper>{leftOpen ? <CloseIcon /> : <OpenIcon />}</CloseWrapper>
      </LeftMenuItem>
      {leftMenuItems.map((item, index) => (
        <Link href={item.link} passHref key={item.label}>
          <a>
            <LeftMenuItem className={pathname === item.link ? 'selected' : ''}>
              <Icon>{item.icon}</Icon>
              <IconLabel>{item.label}</IconLabel>
            </LeftMenuItem>
          </a>
        </Link>
      ))}
    </LeftPanel>
  );
}

AdminLeftMenu.propTypes = {};

export default memo(AdminLeftMenu);
