import Page from '/containers/company/GoodPracticesPage';
import tgpApi from '../api/tgpApi';
export default function LP({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  try {
    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=goodPracticesPage`;
    const res = await fetch(url);


    const api2 = tgpApi.newCandidate.list;
    const res2 = await fetch(`${api2.url}?noSortByState=true`);

    const { candidates } = await res2.json();

    const { content } = await res.json();
    return {
      props: {
        ssrState: {
          content,
          candidates,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        ssrState: {
          content: {},
          candidates: [],
        },
      },
    };
  }
}
