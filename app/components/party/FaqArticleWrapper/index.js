import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BackIcon from '@material-ui/icons/ChevronLeft';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { H1 } from 'components/shared/typogrophy';
import LoadingAnimation from 'components/shared/LoadingAnimation';
import contentfulHelper, { CmsContentWrapper } from 'helpers/contentfulHelper';

const BackIconWrapper = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blue};
    margin-bottom: 24px;
  }
`;

const FaqArticleWrapper = ({ article, backButtonCallback }) => (
  <div>
    {article ? (
      <>
        <Nav />
        <Wrapper white>
          <MobileHeader />
          <BackIconWrapper onClick={backButtonCallback}>
            <BackIcon style={{ fontSize: '34px' }} />
          </BackIconWrapper>
          <H1 style={{ marginBottom: '32px' }}>{article.title}</H1>

          <CmsContentWrapper>
            {contentfulHelper(article.articleBody)}
          </CmsContentWrapper>
        </Wrapper>
      </>
    ) : (
      <LoadingAnimation />
    )}
  </div>
);

FaqArticleWrapper.propTypes = {
  article: PropTypes.object,
  backButtonCallback: PropTypes.func,
};

export default FaqArticleWrapper;
