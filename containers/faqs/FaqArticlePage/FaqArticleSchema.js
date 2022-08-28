import React, { useContext } from 'react';
import { JsonLd } from 'react-schemaorg';

import { CandidateContext, FaqArticlePageContext } from './index';
import { candidateRoute, partyResolver } from '../../helpers/electionsHelper';
import contentfulHelper from '../../../helpers/contentfulHelper';

export default function FaqArticleSchema() {
  const { article } = useContext(FaqArticlePageContext);
  const {
    title,
    articleBody
  } = article;

  return (
    <JsonLd
      item={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        "mainEntity": [{
          "@type": "Question",
          "name": title,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": contentfulHelper(articleBody)
          }
        }]
      }}
    />
  );
}
