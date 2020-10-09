import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Body13, H2 } from 'components/shared/typogrophy';
import TopQuestions from 'components/shared/TopQuestions';
import articlesHelper from 'helpers/articlesHelper';
import BottomButtons from './BottomButtons';

const Wrapper = styled.div`
  margin: 24px 0 48px;
`;
const UpdateWrapper = styled.div`
  margin: 24px 0;
`;

const CampaignStatus = ({ candidate, content, showButtons, buttonsProps }) => {
  const { campaignSummary, campaignUpdates } = candidate;
  let articles = [];
  if (content?.faqArticles) {
    articles = articlesHelper(content.faqArticles, 'election');
  }
  return (
    <Wrapper>
      <Body13 dangerouslySetInnerHTML={{ __html: campaignSummary }} />
      {campaignUpdates && (
        <>
          <H2 style={{ marginTop: '70px' }}>
            Updates ({campaignUpdates.length})
          </H2>
          {campaignUpdates.map(update => (
            <UpdateWrapper key={update.id}>
              <Body13 dangerouslySetInnerHTML={{ __html: update.text }} />
            </UpdateWrapper>
          ))}
        </>
      )}
      {showButtons && <BottomButtons {...buttonsProps} />}
      <TopQuestions articles={articles} />
    </Wrapper>
  );
};

CampaignStatus.propTypes = {
  candidate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showButtons: PropTypes.bool,
  buttonsProps: PropTypes.object,
};

export default CampaignStatus;
