import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';

import { Body, Body13, H1, H3 } from 'components/shared/typogrophy';

import AdminPageWrapper from './AdminPageWrapper';
import { leftMenuItems } from '../AdminLeftMenu';

const Wrapper = styled.div`
  text-align: center;
  padding: 24px;
`;

const Heart = styled.div`
  width: 84px;
  height: 76px;
  margin: 12px auto;
  position: relative;
`;

const IconLabel = styled(Body13)`
  color: #fff;
`;

const NavItem = styled.div`
  padding: 24px 8px;
  background: linear-gradient(
    180deg,
    rgba(67, 0, 211, 0.4) 11.17%,
    rgba(67, 0, 211, 0.6) 76.34%
  );
  color: #fff;
  border-radius: 8px;

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
  <AdminPageWrapper>
    <Wrapper>
      <br />
      <H1>Admin Dashboard</H1>
      <Heart>
        <Image src="/images/heart.svg" layout="fill" />
      </Heart>
      <br />
      <br />
      <Grid container spacing={3} alignItems="center" justify="center">
        {leftMenuItems.map(item => (
          <Grid item xs={12} md={6} lg={3} xl={2} key={item.label}>
            <Link href={item.link} passHref>
              <a>
                <NavItem>
                  <div>{item.icon}</div>
                  <IconLabel>{item.label}</IconLabel>
                </NavItem>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
      <br />
      <Body style={{ marginTop: '40px' }}>
        <H3>Useful Links</H3>
        <br />
        <a href="https://datastudio.google.com/s/jA995G5uXkg" target="_blank">
          Analytics Dashboard
        </a>
        <br />
        <br />
        <a href="https://zoom.goodparty.org" target="_blank">
          GP Zoom
        </a>
        <br />
        <br />
        <a
          href="https://www.notion.so/goodparty/7c465bbf8bf9480e9a86c74edc938bbe?v=7b1c609de9474ed48ef0e85b917b21cc"
          target="_blank"
        >
          Notion Dev Board
        </a>
        <br />
        <br />
        <a
          href="https://www.notion.so/goodparty/83449bb9d1a94dae80df683eae217ddb?v=f8246250568e45e9a994041cf17fffcb"
          target="_blank"
        >
          Roadmap
        </a>
        <br />
        <br />
        <a href="https://intro.goodparty.org/" target="_blank">
          intro.goodparty.org
        </a>
        <br />
        <br />
        <a
          href="https://docs.google.com/presentation/d/1XHUD0eNs0F_q08nMMG04tCTq0wB93is-g-3Uq1WdjoI/edit#slide=id.ge1899cc4d6_0_65"
          target="_blank"
        >
          GP Deck Template
        </a>
      </Body>
    </Wrapper>
  </AdminPageWrapper>
);

AdminWrapper.propTypes = {};

export default AdminWrapper;
