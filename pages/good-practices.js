import Page from 'containers/GoodPracticesPage';
import tgpApi from '../api/tgpApi';
export default function LP({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.contentByKey;
  const url = `${api.url}?key=goodPracticesPage`;

  let content;
  try {
    const res = await fetch(url);

    ({ content } = await res.json());
  } catch (e) {
    content = {};
  }
  return {
    props: {
      ssrState: {
        content,
      },
    }, // will be passed to the page component as props
  };
}
