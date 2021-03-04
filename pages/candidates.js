import Page from 'containers/CandidatesPage';
import tgpApi from 'api/tgpApi';

export default function Candidates({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.newCandidate.list;
  console.log('api', api)
  const res = await fetch(api.url);

  const { candidates } = await res.json();

  return {
    props: {
      ssrState: {
        candidates,
      },
    }, // will be passed to the page component as props
  };
}
