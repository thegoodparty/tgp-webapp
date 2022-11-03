import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

import { Body13 } from '/components/shared/typogrophy';

import AdminPageWrapper from '../shared/AdminPageWrapper';
import { leftMenuItems } from '../shared/AdminLeftMenu';
import AdminPanel from '../shared/AdminPanel';
import StatsSection from './StatsSection';

const IconLabel = styled(Body13)`
  color: #fff;
`;

const NavItem = styled.div`
  padding: 24px 16px;
  background: #000;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  font-weight: 900;

  @keyframes shadow-drop-2-center {
    0% {
      transform: translateZ(0);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
    100% {
      transform: translateZ(20px);
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.35);
    }
  }
  &:hover {
    animation: shadow-drop-2-center 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
`;

const AdminWrapper = () => (
  <AdminPageWrapper title="Admin Dashboard">
    <AdminPanel>
      <Grid container spacing={3} alignItems="center" justify="center">
        {leftMenuItems.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.label}>
            <Link href={item.link}>
              <NavItem>
                <div>{item.icon}</div>
                <IconLabel>{item.label}</IconLabel>
              </NavItem>
            </Link>
          </Grid>
        ))}
      </Grid>
    </AdminPanel>

    <AdminPanel>
      <StatsSection />
    </AdminPanel>
  </AdminPageWrapper>
);

AdminWrapper.propTypes = {};

export default AdminWrapper;
