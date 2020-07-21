const articleHash = {};
// returns only articles that match the page.
const articlesHelper = (articles, page) => {
  return articles.filter(article => {
    let showArticle = false;
    if (!article.pages) {
      return false;
    }
    article.pages.forEach(cmsPage => {
      if (cmsPage === page) {
        showArticle = true;
        return true;
      }
    });
    return showArticle;
  });
};

export const slugify = text => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const getArticleById = (articles, id) => {
  if (Object.keys(articleHash).length === 0) {
    articles.forEach(article => {
      articleHash[article.id] = article;
    });
  }
  return articleHash[id];
};

export default articlesHelper;
