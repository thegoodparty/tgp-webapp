import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BackIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';

import { Body, Body11, H1, Body13 } from 'components/shared/typogrophy';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';

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

const FaqArticleWrapper = ({
  article,
  backButtonCallback,
  closeModalCallback,
  helpfulCallback,
}) => {
  const handleFeedback = feedback => {
    helpfulCallback(article.id, article.title, feedback);
    closeModalCallback();
  };
  return (
    <>
      {article ? (
        <>
          <TgpDialog onClose={closeModalCallback} open={true}>
            <Wrapper>
              <TopWrapper>
                <BackIconWrapper onClick={backButtonCallback}>
                  <BackIcon style={{ fontSize: '34px' }} data-cy="article-back" />
                </BackIconWrapper>
                <TopClose
                  onClick={closeModalCallback}
                  data-cy="article-top-close"
                />
              </TopWrapper>
              <H1 style={{ marginBottom: '32px' }} data-cy="article-title">{article.title}</H1>

              <CmsContentWrapper>
                {contentfulHelper(article.articleBody)}
              </CmsContentWrapper>
              <WasHelpul data-cy="was-helpful">Was this helpful?</WasHelpul>
              <ButtonsWrapper>
                <FeedbackButton
                  className="blue"
                  onClick={() => handleFeedback(true)}
                  data-cy="helpful-yes"
                >
                  Yes
                </FeedbackButton>
                <FeedbackButton onClick={() => handleFeedback(false)} data-cy="helpful-no">
                  No
                </FeedbackButton>
              </ButtonsWrapper>
              <div className="text-center">
                <Close onClick={closeModalCallback} data-cy="article-bottom-close">Close</Close>
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
