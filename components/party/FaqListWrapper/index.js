import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Body, Body19, H1 } from 'components/shared/typogrophy';
import PageWrapper from 'components/shared/PageWrapper';
import Breadcrumbs from '../../shared/Breadcrumbs';

const ArticleWrapper = styled.a`
  .article-title {
    padding: 6px 0 6px 40px;
    color: ${({ theme }) => theme.colors.purple};
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 8px 0 8px 40px;
    }
  }
`;

const Category = styled(Body19)`
  margin: 6px 0 32px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 8px 0 48px;
  }
`;

const CategoryName = styled(Body19)`
  margin-bottom: 8px;
`;

const Hero = styled.div`
  margin-top: 0;
  height: 220px;
  position: relative;
  width: 100%;
  background: url(https://assets.thegoodparty.org/faq-hero-new.jpg) no-repeat
    top center;
  background-size: cover;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 18px;
    height: 450px;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 18px;
    height: 500px;
  }
`;

const Shadow = styled.div`
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0) 31.04%,
    rgba(17, 17, 17, 0.2) 62.89%,
    rgba(17, 17, 17, 0.8) 86.02%
  );
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const HeroText = styled(H1)`
  font-size: 40px;
  position: absolute;
  bottom: 16px;

  color: #fff;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 94px;
    bottom: 64px;
  }
`;

const ContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
  padding: 24px 18px 16px;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 32px 20px 16px;
  }
`;

const StyledH1 = styled(H1)`
  margin: 24px 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 32px 0;
  }
`;

const breadcrumbsLinks = [
  { href: '/', label: 'The Good Party' },
  {
    label: 'Frequently asked questions',
  },
];

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
        <Breadcrumbs links={breadcrumbsLinks} />
        <StyledH1 data-cy="faqs-page-title">
          Frequently Asked Questions
        </StyledH1>
        {categories &&
          categories.map(category => (
            <Category key={category.id}>
              <CategoryName>{category.fields.name}</CategoryName>
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
