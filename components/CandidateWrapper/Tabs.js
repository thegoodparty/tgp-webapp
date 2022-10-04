/**
 *
 * Tabs
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { CandidateContext } from '/containers/CandidatePage';
import { candidateRoute } from '/helpers/electionsHelper';

import MaxWidth from '../shared/MaxWidth';
import Row from '../shared/Row';
import { candidateColor } from '../../helpers/candidatesHelper';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 64px;
`;

const Tab = styled.div`
  position: relative;
  margin: 0 15px 15px 0;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0 20px;

  &.active {
    font-weight: 900;
  }
`;

const Line = styled.div`
  height: 3px;
  background-color: #eeeeee;
`;
const SmLine = styled.div`
  height: 3px;
  position: absolute;
  width: 100%;
  bottom: -18px;
  left: 0;
`;

const TabsWrapper = styled(Row)`
  justify-content: space-between;
  @media only screen and (min-width: 1024px) {
    justify-content: initial;
  }
`;

const tabs = [{ label: 'Feed' }, { label: 'Campaign' }, { label: 'Bio' }];

function Tabs() {
  const { candidate, tab } = useContext(CandidateContext);
  const activeTab = tab;
  const brightColor = candidateColor(candidate);
  const route = candidateRoute(candidate);
  return (
    <Wrapper>
      <MaxWidth>
        <TabsWrapper>
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.label === 'Feed' ? route : `${route}/${tab.label}`}
              passHref
            >
              <a className="no-underline" id={`${tab.label}-tab`} data-cy={`tab-link-${tab.label}`}>
                <Tab
                  className={activeTab === tab.label && 'active'}
                  style={activeTab === tab.label ? { color: brightColor } : {}}
                >
                  {tab.label}
                  {activeTab === tab.label && (
                    <SmLine style={{ backgroundColor: brightColor }} />
                  )}
                </Tab>
              </a>
            </Link>
          ))}
        </TabsWrapper>
      </MaxWidth>
      <Line />
    </Wrapper>
  );
}

export default Tabs;
