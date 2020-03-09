import React from 'react';
import styled from 'styled-components';

import { Body, Body12 } from 'components/shared/typogrophy/index';
import { formatDateWithTimezone } from 'helpers/dateHelper';
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

const EventSnippet = ({ event }) => {
  const {
    id,
    title,
    dateAndTime,
    timeZone,
    description,
    presenter,
    presenterTitle,
    avatarPhoto,
  } = event;
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
      <ButtonWrapper>
        <OutlinedButton fullWidth active label="I'M INTERESTED" />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default EventSnippet;
