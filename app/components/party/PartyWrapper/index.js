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
import contentfulHelper from 'helpers/contentfulHelper';

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

const CmsContentWrapper = styled.div`
  margin-top: 28px;
  h3 {
    margin-top: 28px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 19px;
    line-height: 25px;
    font-weight: 600;
    margin: 0;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 26px;
      line-height: 32px;
    }
  }
  p {
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 20px;
      line-height: 26px;
    }
  }
`;

const PartyWrapper = ({ content }) => {
  const events = content ? content.events : [];
  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'party');
  }
  let mainContent = '';
  if (content && content.partyPage) {
    console.log('here', content.partyPage.content);
    mainContent = contentfulHelper(content.partyPage.content);
    console.log(mainContent);
  }
  return (
    <div>
      <Nav />
      <Wrapper style={{ backgroundColor: '#FFF' }}>
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
  content: PropTypes.object,
};

export default PartyWrapper;
