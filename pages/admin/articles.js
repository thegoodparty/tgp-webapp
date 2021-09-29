import Page from 'containers/admin/AdminArticlesPage';
import tgpApi from '../../api/tgpApi';

export default function Admin({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  try {
    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=faqArticles`;
    const res = await fetch(url);

    const { content } = await res.json();
    return {
      props: {
        ssrState: {
          content,
        },
      },
    };
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
