import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Body, Body11, H1, Body13 } from 'components/shared/typogrophy';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import { PurpleButton } from '../../shared/buttons';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
    }
  }
`;

const Wrapper = styled.div`
  padding: 12px;
  @media only screen and (min-width: ${({ theme }) =>
    theme.breakpointsPixels.md}) {
    padding: 36px;
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
    position: absolute;
    right: 32px;
  }
`;

const TopClose = styled(CloseIcon)`
  font-size: 24px;
  cursor: pointer;
  color: #5c00c7;
`;

const WasHelpul = styled(Body)`
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
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 14px auto;
  justify-content: end;
  margin-right: 0;
  max-width: 150px;
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
  useEffect(() => {
    if (isHelpful === HELPFUL_STATES.helpful) {
      handleSubmit();
    }
  }, [isHelpful]);

  const handleFeedback = event => {
    setFeedback(event.target.value);
  };

  const handleHelpful = isHelpfulVal => {
    if (isHelpfulVal) {
      setIsHelpful(HELPFUL_STATES.helpful);
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
      {article ? (
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
              <ButtonsWrapper>
                <WasHelpul
                  data-cy="was-helpful"
                  className={isHelpful === HELPFUL_STATES.notHelpful && 'grey'}
                >
                  {isHelpful !== HELPFUL_STATES.notHelpful
                    ? 'Was this helpful?'
                    : 'Why wasn’t this entry helpful?'}
                </WasHelpul>
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
                  <SubmitButtonWrapper
                    onClick={handleSubmit}
                    data-cy="feedback-submit"
                  >
                    <PurpleButton disabled={feedback === ''} fullWidth>
                      SUBMIT
                    </PurpleButton>
                  </SubmitButtonWrapper>
                </>
              )}
              {/* <div className="text-center">
                <Close
                  onClick={closeModalCallback}
                  data-cy="article-bottom-close"
                >
                  Close
                </Close>
              </div> */}
            </Wrapper>
          </TgpDialog>
        </>
      ) : (
        <LoadingAnimation />
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
