import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { H3, Body, Body13 } from '/components/shared/typogrophy';

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
  color: ${({ theme }) => theme.colors.primary};
`;

const ArticleTitle = styled(Body)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 28px;

  &.first: {
    margin-top: 18px;
  }
`;

const TopQuestions = ({ articles }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Row>
        <H3 data-cy="faqs">Top Questions</H3>
        <Link href="/faqs" data-cy="faqs-link">
          <a data-cy="faqs-see-link">
            <SeeFaq>See FAQ</SeeFaq>
          </a>
        </Link>
      </Row>
      {articles &&
        articles.map((article, index) => (
          <Link
            href={`${router?.asPath}?article=${article.id}`}
            key={article.id}
            data-cy="faq"
          >
            <a>
              <ArticleTitle
                className={index === 0 ? 'first' : ''}
                data-cy="faq-title"
              >
                {article.title}
              </ArticleTitle>
            </a>
          </Link>
        ))}
    </Wrapper>
  );
};

TopQuestions.propTypes = {
  articles: PropTypes.array,
};

export default TopQuestions;
