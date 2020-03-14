import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

import addToCalendarLib from 'lib/add-to-calendar';

import { Body, Body12 } from 'components/shared/typogrophy/index';
import {
  formatDateWithTimezone,
  dateISOStringHelper,
} from 'helpers/dateHelper';
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
  margin-left: 16px;
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

const LinksWrapper = styled(Body12)`
  margin-top: 16px;
  a {
    display: block;
    padding: 12px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.gray9};
    text-align: center;
  }
`;

const Close = styled.div`
  padding: 12px;
  text-align: right;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
`;

const EventSnippet = ({ event }) => {
  const [links, setLinks] = useState({});
  const {
    id,
    title,
    dateAndTime,
    timeZone,
    description,
    presenter,
    presenterTitle,
    avatarPhoto,
    eventDuration,
  } = event;

  const addMe = () => {
    const start = dateISOStringHelper(dateAndTime, timeZone);
    const end = dateISOStringHelper(dateAndTime, timeZone, eventDuration);
    console.log(start, end);
    encodeURI();
    const calenderEvent = {
      title: title.replace(/&/g, ' and '),
      start,
      end,
      address: 'https://www.thegoodparty.org',
      description: description.replace(/&/g, ' and '),
    };
    const calenderLinks = addToCalendarLib.generateCalendars({
      ...calenderEvent,
    });
    setLinks(calenderLinks);
  };
  const linksMarkup = () => {
    let textLinks = '';
    Object.keys(links).map(link => {
      textLinks += links[link];
    });
    return { __html: textLinks };
  };

  const closeLinks = () => {
    setLinks([]);
  };

  return (
    <Wrapper key={id}>
      <Row>
        <div>
          <Body className="bold600">{title}</Body>
          {dateAndTime && (
            <StyledBody12>
              {formatDateWithTimezone(dateAndTime, timeZone)}
            </StyledBody12>
          )}
          {description && <StyledBody12>{description}</StyledBody12>}
          {presenter && (
            <StyledBody12>
              <span className="bold500 spacing05">{presenter}</span>{' '}
              {presenterTitle}
            </StyledBody12>
          )}
        </div>
        <Photo src={avatarPhoto} />
      </Row>
      <ButtonWrapper onClick={addMe}>
        <OutlinedButton fullWidth active>
          I'M INTERESTED
        </OutlinedButton>
      </ButtonWrapper>
      {Object.keys(links).length > 0 && (
        <LinksWrapper>
          <Close onClick={closeLinks}>
            <CloseIcon />
          </Close>

          {Object.keys(links).length > 0 && (
            <div dangerouslySetInnerHTML={linksMarkup()} />
          )}
        </LinksWrapper>
      )}
    </Wrapper>
  );
};

EventSnippet.propTypes = {
  event: PropTypes.object,
};

export default EventSnippet;
