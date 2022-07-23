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
  background-color: #d3d3d3;
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
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    justify-content: initial;
  }
`;

const tabs = [{ label: 'Feed' }, { label: 'Campaign' }, { label: 'Bio' }];

function Tabs() {
  const { candidate, tab } = useContext(CandidateContext);
  const activeTab = tab;
  const { color } = candidate;
  const brightColor = color?.color ? color.color : '#000';
  const route = candidateRoute(candidate);
  return (
    <Wrapper>
      <MaxWidth>
        <TabsWrapper>
          {tabs.map((tab) => (
            <Link key={tab.label} href={`${route}/${tab.label}`} passHref>
              <a className="no-underline">
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