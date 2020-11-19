import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import BackIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

import { Body, Body11, H1, Body13 } from 'components/shared/typogrophy';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';
import { BlueButton } from '../../shared/buttons';

const TgpDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      margin: 12px !important;
    }
  }
`;

const Wrapper = styled.div`
  padding: 12px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 24px;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const TopClose = styled(CloseIcon)`
  font-size 24px;
  cursor: pointer;
  
`;

const BackIconWrapper = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
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
  border-radius: 30px;
  margin: 0 20px;
  cursor: pointer;

  &.blue {
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

const Close = styled(Body13)`
  text-align: center;
  color: ${({ theme }) => theme.colors.blue};
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
  backButtonCallback,
  closeModalCallback,
  helpfulCallback,
}) => {
  const [feedback, setFeedback] = useState('');
  const [isHelpful, setIsHelpful] = useState(HELPFUL_STATES.notSelected);

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
          <TgpDialog onClose={closeModalCallback} open>
            <Wrapper>
              <TopWrapper>
                <BackIconWrapper onClick={backButtonCallback}>
                  <BackIcon
                    style={{ fontSize: '34px' }}
                    data-cy="article-back"
                  />
                </BackIconWrapper>
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
                    className="blue"
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
                    <BlueButton disabled={feedback === ''} fullWidth>
                      SUBMIT
                    </BlueButton>
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
