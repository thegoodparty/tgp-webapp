import Page from '/containers/faqs/FaqArticlePage';
import tgpApi from '/api/tgpApi';
import { slugify } from '/helpers/articlesHelper';
import { candidateRoute } from '../../helpers/electionsHelper';
import { faqArticleRoute } from '../../helpers/faqHelper';

export default function FaqList({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  try {
    const { res } = context;
    const { TitleId } = context.params;
    const title = TitleId?.length > 0 ? TitleId[0] : false;
    const id = TitleId?.length > 1 ? TitleId[1] : false;

    console.log('id', id);
    console.log('title', title);
    if (id && id !== 'undefined' && typeof id !== 'undefined') {
      const api = tgpApi.contentByKey;
      const url = `${api.url}?key=faqArticles&subKey=id&subValue=${id}`;
      const response = await fetch(url);

      const { content } = await response.json();
      if (!content) {
        res.statusCode = 404;
        res.end();
        return {};
      }

      const articleTitle = content.title;
      console.log('articleTitle', articleTitle);
      console.log('title', title);
      console.log('slugify(articleTitle)', slugify(articleTitle));
      if (slugify(articleTitle) !== title) {
        console.log('redirecting', faqArticleRoute(content));
        res.setHeader('Location', faqArticleRoute(content));
        res.statusCode = 301;
        res.end();
        return {
          props: {},
        };
      } else {
        return {
          props: {
            ssrState: {
              article: content,
            },
          },
        };
      }
    } else {
      res.statusCode = 404;
      res.end();

      return {
        props: {},
      };
    }
  } catch (e) {
    return {
      props: {
        ssrState: {
          content: {},
        },
      },
    };
  }
}
