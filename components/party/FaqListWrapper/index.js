import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Body, Body19, H1 } from 'components/shared/typogrophy';
import PageWrapper from 'components/shared/PageWrapper';

const ArticleWrapper = styled.a`
  .article-title {
    padding: 8px 0 8px 30px;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const Category = styled(Body19)`
  margin: 8px 0 48px;
`;

const Hero = styled.div`
  margin-top: 0;
  height: 190px;
  background-color: pink;

  position: relative;
  width: 100%
  background: url(http://assets.thegoodparty.org/faq-hero.jpeg)
    no-repeat center center;
  background-size: cover;
  margin-bottom: 30px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 18px;
    height: 360px;
  }
`;

const Shadow = styled.div`
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0) 31.04%,
    rgba(17, 17, 17, 0.2) 62.89%,
    rgba(17, 17, 17, 0.8) 86.02%
  );
  position: absolue;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const HeroText = styled(H1)`
  font-size: 40px;
  position: absolute;
  bottom: 20px;

  color: #fff;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 94px;
    bottom: 50px;
  }
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 10px 20px;
`;

const FaqListWrapper = ({ content }) => {
  const categories = content.articleCategories || [];

  return (
    <PageWrapper white isFullWidth>
      <Hero>
        <Shadow />
        <ContentWrapper>
          <HeroText>Help Center</HeroText>
        </ContentWrapper>
      </Hero>
      <ContentWrapper>
        <H1 style={{ marginBottom: '24px' }} data-cy="faqs-page-title">
          Frequently Asked Questions
        </H1>
        {categories &&
          categories.map(category => (
            <Category>
              {category.fields.name}
              {category.articles &&
                category.articles.map(article => (
                  <Link
                    href={`?article=${article.id}`}
                    key={article.id}
                    data-cy="faq"
                    passHref
                  >
                    <ArticleWrapper>
                      <Body className="article-title" data-cy="faq-title">
                        {article.title}
                      </Body>
                    </ArticleWrapper>
                  </Link>
                ))}
            </Category>
          ))}
      </ContentWrapper>
    </PageWrapper>
  );
};

FaqListWrapper.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  backButtonCallback: PropTypes.func,
};

export default FaqListWrapper;
