/**
 *
 * CandidateWrapper
 *
 */

import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import NotFound from '/containers/shared/NotFoundPage';
import PageWrapper from '../shared/PageWrapper';

import { CandidateContext } from '../../containers/CandidatePage';
import Header from './Header';
import Tabs from './Tabs';
import MaxWidth, { Padder } from '../shared/MaxWidth';

const tabs = [
  { route: 'Feed', component: <div>Feed component</div> },
  { route: 'Campaign', component: <div>Campaign component</div> },
  { route: 'Bio', component: <div>Bio component</div> },
];

function CandidateWrapper() {
  const { candidate, tab } = useContext(CandidateContext);
  if (!candidate) {
    return <NotFound />;
  }

  return (
    <PageWrapper isFullWidth>
      <MaxWidth>
        <Padder>
          <Header />
        </Padder>
      </MaxWidth>
      <Tabs />
      <MaxWidth>
        {tabs.map((tabContent) => (
          <React.Fragment key={tabContent.route}>
            {tabContent.route === tab && <>{tabContent.component}</>}
          </React.Fragment>
        ))}
      </MaxWidth>
    </PageWrapper>
  );
}

export default CandidateWrapper;
