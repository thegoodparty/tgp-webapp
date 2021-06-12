import Page from 'containers/GoodPracticesPage';
import tgpApi from '../api/tgpApi';
export default function LP({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.contentByKey;
  const url = `${api.url}?key=goodPracticesPage`;

  const res = await fetch(url);

  const { content } = await res.json();
  return {
    props: {
      ssrState: {
        content,
      },
    }, // will be passed to the page component as props
  };
}
