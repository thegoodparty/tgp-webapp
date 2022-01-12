/**
 *
 * ProfileTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  a {
    flex-basis: 33.33%;
  }
`;
const Tab = styled.div`
  padding: 8px;
  background-color: #f5f7fa;
  border: solid 1px #d6d4e2;
  color: #8c90ab;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 14px;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 18px;
  }

  &.center {
    border-left: none;
    border-right: none;
  }

  &.active {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.purple};
    border-bottom: none;
  }
`;

const tabs = [
  { label: 'Profile', img: 'profile', link: '/profile' },
  { label: 'Settings', img: 'settings', link: '/profile/settings' },
  { label: 'Leaderboard', img: 'leaderboard', link: '/profile/leaderboard' },
  {
    label: 'Application',
    img: 'application',
    link: '/profile/campaign-applications',
  },
];

function ProfileTabs({ activeTab = 'Profile' }) {
  return (
    <Wrapper>
      {tabs.map((tab, index) => (
        <Link href={tab.link} passHref>
          <a>
            <Tab
              key={tab.label}
              className={`${index === 1 && 'center'} ${tab.label ===
                activeTab && 'active'}`}
            >
              <Image
                src={`/images/profile/${tab.img}${
                  tab.label === activeTab ? '-selected' : ''
                }.png`}
                width={40}
                height={40}
              />
              {tab.label}
            </Tab>
          </a>
        </Link>
      ))}
    </Wrapper>
  );
}

ProfileTabs.propTypes = { activeTab: PropTypes.string };

export default ProfileTabs;
