import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { H3, Body, Body13 } from 'components/shared/typogrophy';

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

  &.first: {
    margin-top: 18px;
  }
`;

const TopQuestions = ({ articles }) => {
  return (
    <Wrapper>
      <Row>
        <H3 data-cy="faqs">Top Questions</H3>
        <Link href="/party/faqs" data-cy="faqs-link">
          <SeeFaq className="blue">See FAQ</SeeFaq>
        </Link>
      </Row>
      {articles &&
        articles.map((article, index) => (
          <Link
            href={`?article=${article.id}`}
            key={article.id}
            data-cy="faq"
          >
            <ArticleTitle className={index === 0 ? 'first' : ''} data-cy="faq-title">
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
