import FaqListPage from 'containers/party/FaqListPage';
import tgpApi from '../api/tgpApi';
export default function FaqList({ ssrState }) {
  return <FaqListPage ssrState={ssrState} />;
}

export async function getServerSideProps() {
  try {
    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=articleCategories`;
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
