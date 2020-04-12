import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Collapse from '@material-ui/core/Collapse';
import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { Body13, H3 } from 'components/shared/typogrophy/index';
import IntroCarousel from 'components/intro/ThreeStepsWrapper/CarouselLoadable';
import EventSnippet from 'components/shared/EventSnippet';
import articlesHelper from 'helpers/articlesHelper';
import TopQuestions from 'components/shared/TopQuestions';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import AmaContainer from 'containers/shared/AmaContainer';

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

const LearnMore = styled(Body13)`
  color: ${({ theme }) => theme.colors.blue};
  text-align: right;
  cursor: pointer;
`;

const PartyWrapper = ({ content }) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [slideCarousel, setSlideCarousel] = useState(false);
  const events = content ? content.events : [];

  const transitionTime = 1000;

  let articles = [];
  if (content && content.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'party');
  }
  let mainContent = '';
  if (content && content.partyPage) {
    mainContent = contentfulHelper(content.partyPage.content);
  }

  const toggleShowCarsouel = () => {
    setSlideCarousel(prev => !prev);
    if (showCarousel) {
      setTimeout(() => {
        setShowCarousel(false);
      }, transitionTime);
    } else {
      setShowCarousel(true);
    }
  };
  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        {content && <CmsContentWrapper>{mainContent}</CmsContentWrapper>}

        <Collapse in={slideCarousel} timeout={transitionTime}>
          {showCarousel && (
            <div style={{ marginTop: '50px' }}>
              <IntroCarousel showButton={false} />
            </div>
          )}
        </Collapse>
        <LearnMore onClick={toggleShowCarsouel}>
          {showCarousel ? 'Show Less' : 'Learn More'}
        </LearnMore>
        {events.length > 0 && (
          <EventsWrapper>
            <Row>
              <H3>Upcoming Online Events</H3>
              {/*<StyledBody13>See All</StyledBody13>*/}
            </Row>
            {events.map(event => (
              <EventSnippet event={event} key={event.id} />
            ))}
          </EventsWrapper>
        )}
        <TopQuestions articles={articles} />
      </Wrapper>
      <AmaContainer />
    </div>
  );
};

PartyWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default PartyWrapper;
