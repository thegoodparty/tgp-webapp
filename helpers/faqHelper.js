import { slugify } from './articlesHelper';

export const faqArticleRoute = (article) => {
  if (!article || !article.title || !article.id) {
    return '/';
  }
  const slug = slugify(article.title);
  return `/faqs/${slug}/${article.id}`;
};
