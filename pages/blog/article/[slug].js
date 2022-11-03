import Page from '/containers/blog/BlogArticlePage';
import tgpApi from '/api/tgpApi';
export default function FaqList({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;

    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=blogSections`;
    const res = await fetch(url);

    const { content } = await res.json();

    const url2 = `${api.url}?key=blogArticles&subKey=slug&subValue=${slug}`;
    const res2 = await fetch(url2);

    const res2Json = await res2.json();
    const article = res2Json.content;

    return {
      props: {
        ssrState: {
          sections: content,
          article,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        ssrState: {
          sections: [],
          article: [],
        },
      },
    };
  }
}
