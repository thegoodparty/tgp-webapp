import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Body, Body12 } from 'components/shared/typogrophy/index';
import OutlinedButton from 'components/shared/buttons/OutlinedButton';

const Wrapper = styled.div`
  margin-top: 36px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledBody12 = styled(Body12)`
  margin-top: 8px;
`;

const Photo = styled.img`
  border-radius: 50%;
  height: 55px;
  width: 55px;
  flex-basis: 55px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 100px;
    width: 100px;
    flex-basis: 100px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
`;

const EventSnippet = ({ event, isPastEvent = false }) => {
  const {
    id,
    title,
    displayDate,
    description,
    presenter,
    presenterTitle,
    avatarPhoto,
    location,
  } = event;
  let isLocationLink;
  let locationLink;
  if (location) {
    isLocationLink =
      location.indexOf('http') === 0 || location.indexOf('ama') === 0;
    locationLink =
      location.indexOf('ama') === 0 ? `http://${location}` : location;
  }

  return (
    <Wrapper key={id}>
      <Row>
        <div style={{ marginRight: '16px' }}>
          <Body className="bold600">{title}</Body>
          {displayDate && <StyledBody12>{displayDate}</StyledBody12>}
          {description && <StyledBody12>{description}</StyledBody12>}
          {location && (
            <StyledBody12>
              <strong>Location: </strong>
              {isLocationLink ? (
                <a href={locationLink} target="_blank">
                  {location}
                </a>
              ) : (
                <>{location}</>
              )}
            </StyledBody12>
          )}
          {presenter && (
            <StyledBody12>
              <span className="bold500 spacing05">{presenter}</span>{' '}
              {presenterTitle}
            </StyledBody12>
          )}
        </div>
        <Photo src={avatarPhoto} />
      </Row>
      {!isPastEvent && (
        <a href={locationLink} target="_blank">
          <ButtonWrapper>
            <OutlinedButton fullWidth active>
              I&apos;M INTERESTED
            </OutlinedButton>
          </ButtonWrapper>
        </a>
      )}
    </Wrapper>
  );
};

EventSnippet.propTypes = {
  event: PropTypes.object,
  isPastEvent: PropTypes.bool,
};

export default EventSnippet;
