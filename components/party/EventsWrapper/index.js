/**
 *
 * EventsWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BackIcon from '@material-ui/icons/ChevronLeft';

import PageWrapper from 'components/shared/PageWrapper';
import { H2 } from 'components/shared/typogrophy';
import EventSnippet from 'components/shared/EventSnippet';

const BackIconWrapper = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    display: block;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blue};
    margin-bottom: 24px;
  }
`;

function EventsWrapper({ content, backButtonCallback }) {
  const events = content ? content.events : [];
  const pastEvents = content ? content.pastEvents : [];
  return (
    <PageWrapper white >
      <BackIconWrapper onClick={backButtonCallback} data-cy="back">
        <BackIcon style={{ fontSize: '34px' }} />
      </BackIconWrapper>
      {events.length > 0 && (
        <H2 style={{ marginBottom: '24px' }} data-cy="upcoming-events-title">
          Upcoming Online Events
        </H2>
      )}
      <div data-cy="upcoming-events">
        {events.map(event => (
          <EventSnippet event={event} key={event.id} />
        ))}
      </div>
      {pastEvents.length > 0 && (
        <H2 style={{ margin: '24px 0' }} data-cy="past-events-title">
          Past Events
        </H2>
      )}
      <div data-cy="past-events">
        {pastEvents.map(event => (
          <EventSnippet event={event} key={event.id} isPastEvent />
        ))}
      </div>
    </PageWrapper>
  );
}

EventsWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  backButtonCallback: PropTypes.func,
};

export default EventsWrapper;
