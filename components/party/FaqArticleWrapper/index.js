import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Body, Body11, H1, Body13 } from '/components/shared/typogrophy';
import contentfulHelper, { CmsContentWrapper } from '/helpers/contentfulHelper';
import BlackButton from '../../shared/buttons/BlackButton';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      max-width: 1024px;
    }
  }
`;

const Wrapper = styled.div`
  padding: 12px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    padding: 24px;
  }
`;

const TopWrapper = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 24px;
  }
`;

const TopClose = styled(CloseIcon)`
  font-size: 24px;
  cursor: pointer;
`;

const WasHelpul = styled(Body)`
  text-align: center;
  margin: 35px 0 24px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
  justify-content: center;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 14px auto;
  justify-content: center;
  max-width: 250px;
`;

const FeedbackButton = styled(Body11)`
  padding: 13px 30px;
  text-align: center;
  min-width: 120px;
  border: solid 2px ${({ theme }) => theme.colors.gray7};
  border-radius: 8px;
  margin: 0 20px;
  cursor: pointer;

  &.purple {
    border-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const Close = styled(Body13)`
  text-align: center;
  color: ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  padding: 10px;
`;

const HELPFUL_STATES = {
  notSelected: 0,
  helpful: 1,
  notHelpful: 2,
};

const FaqArticleWrapper = ({
  article,
  closeModalCallback,
  helpfulCallback,
}) => {
  const [feedback, setFeedback] = useState('');
  const [isHelpful, setIsHelpful] = useState(HELPFUL_STATES.notSelected);
  const theme = useTheme();
  const fullScreen = useMediaQuery(
    `(max-width: ${theme.breakpointsPixels.md}px)`,
  );
  // useEffect(() => {
  //   if (isHelpful === HELPFUL_STATES.helpful) {
  //     handleSubmit();
  //   }
  // }, [isHelpful]);

  const handleFeedback = (event) => {
    setFeedback(event.target.value);
  };

  const handleHelpful = (isHelpfulVal) => {
    if (isHelpfulVal) {
      setIsHelpful(HELPFUL_STATES.helpful);
      helpfulCallback(article.id, article.title, true, '');
      closeModalCallback();
    } else {
      setIsHelpful(HELPFUL_STATES.notHelpful);
    }
  };

  const handleSubmit = () => {
    if (isHelpful === HELPFUL_STATES.notSelected) {
      return;
    }
    if (isHelpful === HELPFUL_STATES.helpful) {
      helpfulCallback(article.id, article.title, true, '');
      closeModalCallback();
    } else if (feedback !== '') {
      helpfulCallback(article.id, article.title, false, feedback);
      closeModalCallback();
    }
  };

  return (
    <>
      {article && (
        <>
          <TgpDialog onClose={closeModalCallback} open fullScreen={fullScreen}>
            <Wrapper>
              <TopWrapper>
                <TopClose
                  onClick={closeModalCallback}
                  data-cy="article-top-close"
                />
              </TopWrapper>
              <H1 style={{ marginBottom: '32px' }} data-cy="article-title">
                {article.title}
              </H1>

              <CmsContentWrapper>
                {contentfulHelper(article.articleBody)}
              </CmsContentWrapper>
              <WasHelpul data-cy="was-helpful">Was this helpful?</WasHelpul>
              {isHelpful === HELPFUL_STATES.notSelected && (
                <ButtonsWrapper>
                  <FeedbackButton
                    className="purple"
                    onClick={() => handleHelpful(true)}
                    data-cy="helpful-yes"
                  >
                    Yes
                  </FeedbackButton>
                  <FeedbackButton
                    onClick={() => handleHelpful(false)}
                    data-cy="helpful-no"
                  >
                    No
                  </FeedbackButton>
                </ButtonsWrapper>
              )}
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
                  <SubmitButtonWrapper
                    onClick={handleSubmit}
                    data-cy="feedback-submit"
                  >
                    <BlackButton disabled={feedback === ''} fullWidth>
                      SUBMIT
                    </BlackButton>
                  </SubmitButtonWrapper>
                </>
              )}
              <div className="text-center">
                <Close
                  onClick={closeModalCallback}
                  data-cy="article-bottom-close"
                >
                  Close
                </Close>
              </div>
            </Wrapper>
          </TgpDialog>
        </>
      )}
    </>
  );
};

FaqArticleWrapper.propTypes = {
  article: PropTypes.object,
  backButtonCallback: PropTypes.func,
  closeModalCallback: PropTypes.func,
  helpfulCallback: PropTypes.func,
};

export default FaqArticleWrapper;
