import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/Nav';
import { Body, Body13, H2, H3 } from 'components/shared/typogrophy/index';
import IntroCarousel from 'components/intro/ThreeStepsWrapper/IntroCarousel';
import EventSnippet from 'components/shared/EventSnippet';
import articlesHelper from 'helpers/articlesHelper';
import TopQuestions from 'components/shared/TopQuestions';
import Ama from 'components/shared/Ama';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';

const EventsWrapper = styled.div`
  margin-top: 50px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledBody13 = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
`;

const PartyWrapper = ({ content }) => {
  const events = content ? content.events : [];
  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'party');
  }
  let mainContent = '';
  if (content && content.partyPage) {
    mainContent = contentfulHelper(content.partyPage.content);
  }
  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <IntroCarousel showButton={false} />
        {content && <CmsContentWrapper>{mainContent}</CmsContentWrapper>}

        {events.length > 0 && (
          <EventsWrapper>
            <Row>
              <H3>Upcoming Online Events</H3>
              <StyledBody13>See All</StyledBody13>
            </Row>
            {events.map(event => (
              <EventSnippet event={event} />
            ))}
          </EventsWrapper>
        )}
        <TopQuestions articles={articles} />
      </Wrapper>
      <Ama />
    </div>
  );
};

PartyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PartyWrapper;
