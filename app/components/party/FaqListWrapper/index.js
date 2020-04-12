import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BackIcon from '@material-ui/icons/ChevronLeft';

import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { slugify } from 'helpers/articlesHelper';
import { Body, H2 } from 'components/shared/typogrophy';

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 0;
  cursor: pointer;
  border-bottom: solid 1px ${({ theme }) => theme.colors.grayE};
  &:hover .article-title {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const BackIconWrapper = styled.div`
  display: none;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.blue};
    margin-bottom: 24px;
  }
`;

const FaqListWrapper = ({ content, backButtonCallback }) => {
  const articles = content.faqArticles || [];

  return (
    <div>
      <Nav />
      <Wrapper white>
        <MobileHeader />
        <BackIconWrapper onClick={backButtonCallback}>
          <BackIcon style={{ fontSize: '34px' }} />
        </BackIconWrapper>
        <H2 style={{ marginBottom: '24px' }}>Frequently Asked Q’s</H2>
        {articles &&
          articles.map(article => (
            <Link
              to={`/party/faq/${slugify(article.title)}/${article.id}`}
              key={article.id}
            >
              <ArticleWrapper>
                <Body className="article-title">{article.title}</Body>
                <div>
                  <ChevronRightIcon
                    style={{ fontSize: '30px', marginLeft: '10px' }}
                  />
                </div>
              </ArticleWrapper>
            </Link>
          ))}
      </Wrapper>
    </div>
  );
};

FaqListWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  backButtonCallback: PropTypes.func,
};

export default FaqListWrapper;
