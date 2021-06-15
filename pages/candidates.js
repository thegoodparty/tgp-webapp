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
    // context.res.writeHead(404);
    candidates = [];
  }
  return {
    props: {
      ssrState: {
        candidates,
      },
    }, // will be passed to the page component as props
  };
}
