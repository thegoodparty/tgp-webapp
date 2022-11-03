import Page from '/containers/blog/BlogHomePage';
import tgpApi from '/api/tgpApi';
export default function FaqList({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  try {
    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=blogSections&deleteKey=articles`;
    const res = await fetch(url);

    const { content } = await res.json();

    const url2 = `${api.url}?key=blogArticles&limit=20`;
    const res2 = await fetch(url2);

    const res2Json = await res2.json();
    const articles = res2Json.content;

    return {
      props: {
        ssrState: {
          sections: content,
          articles,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        ssrState: {
          sections: [],
          articles: [],
        },
      },
    };
  }
}
