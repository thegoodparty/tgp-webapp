import React, { useContext } from 'react';
import { JsonLd } from 'react-schemaorg';

import contentfulHelper from '/helpers/contentfulHelper';
import { FaqArticlePageContext } from './index';

export default function FaqArticleSchema() {
  const { article } = useContext(FaqArticlePageContext);
  const { title, articleBody } = article;

  return (
    <JsonLd
      item={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: title,
            acceptedAnswer: {
              '@type': 'Answer',
              text: contentfulHelper(articleBody),
            },
          },
        ],
      }}
    />
  );
}
