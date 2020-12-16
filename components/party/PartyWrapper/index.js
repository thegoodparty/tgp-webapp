import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Body13, Body9, H3 } from 'components/shared/typogrophy/index';
import EventSnippet from 'components/shared/EventSnippet';
import articlesHelper from 'helpers/articlesHelper';
import TopQuestions from 'components/shared/TopQuestions';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import AmaContainer from 'containers/shared/AmaContainer';
import ENV from 'api/ENV';
import PageWrapper from 'components/shared/PageWrapper';

const EventsWrapper = styled.div`
  margin-top: 50px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AppVersion = styled(Body9)`
  color: ${({ theme }) => theme.colors.gray9};
  text-align: center;
  padding-bottom: 20px;
`;

const LearnMore = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  text-align: right;
  cursor: pointer;
`;

const PartyWrapper = ({ content, appVersion }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let events = [];
  if (content) {
    if (content.events.length > 0) {
      events = content.events;
    } else {
      events = content.pastEvents.slice(0, 2);
    }
  }

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'party');
  }
  let mainContent = '';
  if (content && content.partyPage) {
    mainContent = contentfulHelper(content.partyPage.content);
  }

  let productionVersion = false;
  if (
    content.appVersion &&
    content.appVersion.version &&
    content.appVersion.version !== appVersion
  ) {
    productionVersion = content.appVersion.version;
  }
  return (
    <PageWrapper white>
      {content && <CmsContentWrapper>{mainContent}</CmsContentWrapper>}
      {events.length > 0 && (
        <EventsWrapper>
          <Row>
            <H3 data-cy="events">
              {content?.events?.length > 0 ? 'Upcoming' : 'Previous'} Online
              Events
            </H3>
            <Link href="/party/events" data-cy="events-link">
              <LearnMore>See All</LearnMore>
            </Link>
          </Row>
          {events.map(event => (
            <EventSnippet event={event} key={event.id} />
          ))}
        </EventsWrapper>
      )}

      <TopQuestions articles={articles} />
      <AmaContainer />
      <AppVersion>
        The Good Party V.{appVersion} {ENV !== 'prod' && ENV}
        {productionVersion ? (
          <div style={{ marginTop: '8px' }}>
            Latest version: {productionVersion}
          </div>
        ) : (
          ''
        )}
      </AppVersion>
    </PageWrapper>
  );
};

PartyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  appVersion: PropTypes.string,
};

export default PartyWrapper;
