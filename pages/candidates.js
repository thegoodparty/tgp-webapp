import Page from 'containers/CandidatesPage';
import tgpApi from 'api/tgpApi';

export default function Candidates({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.newCandidate.list;
  const res = await fetch(api.url);

  let candidates;
  try {
    ({ candidates } = await res.json());
  } catch (e) {
    candidates = [];
  }

  let content = {};
  try {
    const api2 = tgpApi.contentByKey;
    const url2 = `${api2.url}?key=meetTheCandidates`;
    const res2 = await fetch(url2);
    ({ content } = await res2.json());
  } catch (e) {}

  return {
    props: {
      ssrState: {
        candidates,
        pageContent: content,
      },
    }, // will be passed to the page component as props
  };
}
