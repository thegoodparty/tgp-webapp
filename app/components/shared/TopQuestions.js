import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { H3, Body, Body13 } from 'components/shared/typogrophy';
import { slugify } from 'helpers/articlesHelper';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

const SeeFaq = styled(Body13)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
`;

const ArticleTitle = styled(Body)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 28px;
  font-weight: 600;

  &.first: {
    margin-top: 18px;
  }
`;

const TopQuestions = ({ articles }) => {
  return (
    <Wrapper>
      <Row>
        <H3>Top Questions</H3>
        <Link to="/party/faqs">
          <SeeFaq className="blue">See FAQ</SeeFaq>
        </Link>
      </Row>
      {articles &&
        articles.map((article, index) => (
          <Link
            to={`/party/faq/${slugify(article.title)}/${article.id}`}
            key={article.id}
          >
            <ArticleTitle className={index === 0 ? 'first' : ''}>
              {article.title}
            </ArticleTitle>
          </Link>
        ))}
    </Wrapper>
  );
};

TopQuestions.propTypes = {
  articles: PropTypes.array,
};

export default TopQuestions;
