/**
 *
 * TooltipModal
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import { Body, H1, Body11 } from '../../shared/typogrophy';
import { PurpleButton } from '../../shared/buttons';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      position: relative;
      width: 100vw;
      border-radius: 8px;
      border-radius: 8px;
      padding: 24px;


      }
    }

    .MuiBackdrop-root {
      backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const TopClose = styled(CloseIcon)`
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
  &.purple {
    color: #fff;
  }
`;

const WasHelpful = styled(Body)`
  text-align: left;
  margin-right: 5px;
  &.grey {
    color: #767676;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  align-items: center;
  margin-top: 24px;
`;

const FeedbackButton = styled(Body11)`
  text-align: center;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 19px;
  &.purple {
    border-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 14px auto;
  justify-content: end;
  margin-right: 0;
  max-width: 150px;
`;

const HELPFUL_STATES = {
  notSelected: 0,
  helpful: 1,
  notHelpful: 2,
};
function TooltipModal({
  topic,
  closeModalCallback,
  helpfulCallback,
  candidateId,
  topics,
}) {
  const text = topic ? topics[topic] : false;
  const [feedback, setFeedback] = useState('');
  const [isHelpful, setIsHelpful] = useState(HELPFUL_STATES.notSelected);

  const handleFeedback = event => {
    setFeedback(event.target.value);
  };
  const setDefault = () => {
    setFeedback('');
    setIsHelpful(HELPFUL_STATES.notSelected);
  }
  const handleHelpful = isHelpfulVal => {
    if (isHelpfulVal) {
      setIsHelpful(HELPFUL_STATES.helpful);
      helpfulCallback(candidateId, topic, true, '');
      closeModalCallback();
      setDefault();
    } else {
      setIsHelpful(HELPFUL_STATES.notHelpful);
    }
  };

  const handleSubmit = () => {
    if (isHelpful === HELPFUL_STATES.notSelected) {
      return;
    }
    if (isHelpful === HELPFUL_STATES.helpful) {
      helpfulCallback(candidateId, topic, true, '');
      closeModalCallback();
    } else if (feedback !== '') {
      helpfulCallback(candidateId, topic, false, feedback);
      closeModalCallback();
    }
    setDefault();
  };
  const handleClose = () => {
    closeModalCallback();
    setDefault();
  }
  return (
    <TgpDialog onClose={handleClose} open={text}>
      <TopWrapper>
        <TopClose onClick={handleClose} />
      </TopWrapper>
      <H1>{topic}</H1>
      <Body style={{ marginTop: '20px' }}>{text}</Body>
      <ButtonsWrapper>
        <WasHelpful data-cy="was-helpful" className="grey">
          {isHelpful !== HELPFUL_STATES.notHelpful
            ? 'Was this helpful?'
            : 'Why wasn’t this entry helpful?'}
        </WasHelpful>
        {isHelpful === HELPFUL_STATES.notSelected && (
          <>
            <FeedbackButton
              className="purple"
              onClick={() => handleHelpful(true)}
              data-cy="helpful-yes"
            >
              Yes
            </FeedbackButton>
            |
            <FeedbackButton
              className="purple"
              onClick={() => handleHelpful(false)}
              data-cy="helpful-no"
            >
              No
            </FeedbackButton>
          </>
        )}
      </ButtonsWrapper>
      {isHelpful === HELPFUL_STATES.notHelpful && (
        <>
          <TextField
            rows={4}
            multiline
            fullWidth
            placeholder="Please let us know how we can improve."
            onChange={handleFeedback}
            variant="outlined"
            required
            data-cy="feedback"
          />
          <SubmitButtonWrapper onClick={handleSubmit} data-cy="feedback-submit">
            <PurpleButton
              className="submit"
              disabled={feedback === ''}
              fullWidth
            >
              SUBMIT
            </PurpleButton>
          </SubmitButtonWrapper>
        </>
      )}
    </TgpDialog>
  );
}

TooltipModal.propTypes = {
  topic: PropTypes.string,
  closeModalCallback: PropTypes.func,
  helpfulCallback: PropTypes.func,
  topics: PropTypes.object,
  candidateId: PropTypes.number,
};

export default TooltipModal;
