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
  return (
    <div>
      <Nav />
      <Wrapper style={{ backgroundColor: '#FFF' }}>
        <MobileHeader />
        <IntroCarousel showButton={false} />
        <H3 style={{ marginTop: '56px', marginBottom: '8px' }}>
          What is the Good Party?
        </H3>
        <Body>
          The Good Party is a free, open-source platform and tech that helps
          people organize to use the write-in vote to replace corrupt
          politicians who are beholden to big money and special interests, with
          good independent citizen candidates who will serve the people.
        </Body>

        <H3 style={{ marginTop: '28px', marginBottom: '8px' }}>How it works</H3>
        <Body>
          We pre-organize to see where we have enough support for a win; then we
          select and vet a good candidate; finally we all invoke our
          constitutional right and <strong>write-in, for the win!</strong>
        </Body>
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
  content: PropTypes.object,
};

export default PartyWrapper;
