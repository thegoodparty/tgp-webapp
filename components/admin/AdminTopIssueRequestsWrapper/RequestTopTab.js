/**
 *
 * RequestTopTab.js
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Link from 'next/link';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  a {
    flex-basis: 25%;
  }
`;
const Tab = styled.div`
  padding: 16px 8px;
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
  { label: 'Update Requests', link: '/admin/update-requests' },
  { label: 'Candidate Applications', link: '/admin/application-requests' },
  { label: 'Top Issues Manager', link: '/admin/issue-topics' },
  { label: 'Top Issues Requests', link: '/admin/top-issue-requests' },
];

function RequestTopTab({ activeTab = 'Update Requests' }) {
  return (
    <Wrapper>
      {tabs.map((tab, index) => (
        <Link href={tab.link} passHref key={index}>
          <a>
            <Tab
              key={tab.label}
              className={`${index === 1 && 'center'} ${tab.label ===
                activeTab && 'active'}`}
            >
              {tab.label}
            </Tab>
          </a>
        </Link>
      ))}
    </Wrapper>
  );
}
RequestTopTab.propTypes = { activeTab: PropTypes.string };

export default RequestTopTab;
