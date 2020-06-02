import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, Body9, H3 } from 'components/shared/typogrophy/index';
import EventSnippet from 'components/shared/EventSnippet';
import articlesHelper from 'helpers/articlesHelper';
import TopQuestions from 'components/shared/TopQuestions';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import AmaContainer from 'containers/shared/AmaContainer';
import ENV from 'api/ENV';

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
  const events = content ? content.events : [];

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
    <div style={{ backgroundColor: '#FFF' }}>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        {content && <CmsContentWrapper>{mainContent}</CmsContentWrapper>}
        {events.length > 0 && (
          <EventsWrapper>
            <Row>
              <H3>Upcoming Online Events</H3>
              <Link to="/party/events">
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
      </Wrapper>
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
    </div>
  );
};

PartyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  appVersion: PropTypes.string,
};

export default PartyWrapper;
