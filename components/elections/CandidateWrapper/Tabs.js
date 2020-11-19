import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'next/link';

import { Body13 } from 'components/shared/typogrophy';

import { candidateRoute } from 'helpers/electionsHelper';

const TabsWrapper = styled.div`
  margin: 23px 0 35px;
  display: flex;
  justify-content: center;
  border-bottom: solid ${({ theme }) => theme.colors.grayC} 1px;
`;

const Tab = styled(Body13)`
  padding: 12px 30px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }

  &.active {
    border-bottom: solid ${({ theme }) => theme.colors.blue} 2px;
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const Tabs = ({ candidate, tab }) => {
  const route = candidateRoute(candidate);

  return (
    <TabsWrapper>
      <Link href={route}>
        <Tab className={tab === 'campaign' ? 'active' : ''}>
          CAMPAIGN STATUS
        </Tab>
      </Link>
      <Link href={`${route}/info`}>
        <Tab className={tab !== 'campaign' ? 'active' : ''}>CANDIDATE INFO</Tab>
      </Link>
    </TabsWrapper>
  );
};

Tabs.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  tab: PropTypes.string,
};

export default Tabs;
