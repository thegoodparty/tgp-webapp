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

  let homepageCandidates = [];
  try {
    const api2 = tgpApi.homepageCandidates;
    const res2 = await fetch(api2.url);
    ({ homepageCandidates } = await res2.json());
  } catch (e) {
    homepageCandidates = [];
  }

  return {
    props: {
      ssrState: {
        candidates,
        homepageCandidates,
      },
    }, // will be passed to the page component as props
  };
}
