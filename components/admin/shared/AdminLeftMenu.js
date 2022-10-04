/**
 *
 * AdminLeftMenu
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { Font16 } from '/components/shared/typogrophy';
import { getUserCookie } from '/helpers/cookieHelper';

const LeftPanel = styled.div`
  padding: 0 10px 20px 10px;
  text-align: center;
  @media only screen and (min-width: 1024px) {
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
  @media only screen and (min-width: 1024px) {
    display: block;
    padding-bottom: 40px;
    padding-right: 0;
  }
`;

export const leftMenuItems = [
  {
    label: 'Admin Dashboard',
    link: '/admin',
  },
  {
    label: 'Candidates',
    link: '/admin/candidates',
  },
  {
    label: 'Users',
    link: '/admin/users',
  },
  {
    label: 'Candidate Applications',
    link: '/admin/application-requests',
  },
  {
    label: 'Top Issues',
    link: '/admin/top-issues',
  },
  {
    label: 'Articles Feedback',
    link: '/admin/articles',
  },
];

function AdminLeftMenu() {
  const router = useRouter();
  let pathname = router.asPath;

  return (
    <LeftPanel>
      {leftMenuItems.map((item) => (
        <React.Fragment key={item.label}>
          <Link href={item.link} passHref>
            <a>
              <Label className={pathname === item.link ? 'selected' : ''}>
                {item.label}
              </Label>
            </a>
          </Link>
        </React.Fragment>
      ))}
    </LeftPanel>
  );
}

AdminLeftMenu.propTypes = {
  id: PropTypes.string,
  role: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default memo(AdminLeftMenu);
