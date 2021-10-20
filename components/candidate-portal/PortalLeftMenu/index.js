/**
 *
 * PortalLeftMenu
 *
 */

import React, { memo, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/ChevronLeft';
import OpenIcon from '@material-ui/icons/ChevronRight';

import { ImEmbed2 } from 'react-icons/im';
import { MdSettings } from 'react-icons/md';
import { BiHomeHeart } from 'react-icons/bi';

import { Body13 } from 'components/shared/typogrophy/index';

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
  },
  {
    icon: <MdSettings size={24} />,
    label: 'Campaign Manager',
    link: '/candidate-portal/campaign-manager',
  },
  {
    icon: <ImEmbed2 size={24} />,
    label: 'Embed Button',
    link: '/candidate-portal/embed',
  },
];
function PortalLeftMenu() {
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

PortalLeftMenu.propTypes = {};

export default memo(PortalLeftMenu);
