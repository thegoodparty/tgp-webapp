import Page from '/containers/CandidatesPage';
import tgpApi from '/api/tgpApi';

export default function Candidates({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.newCandidate.list;
  const res = await fetch(api.url);

  let candidates;
  let topics;
  try {
    ({ candidates, topics } = await res.json());
  } catch (e) {
    candidates = [];
    topics = [];
  }

  return {
    props: {
      ssrState: {
        candidates,
        topics,
      },
    },
  };
}
