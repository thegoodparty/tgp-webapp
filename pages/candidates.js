import Page from '/containers/CandidatesPage';
import tgpApi from '/api/tgpApi';

export default function Candidates({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const api = tgpApi.newCandidate.list;
  const { filters } = context.query;
  const url = `${api.url}${filters ? `?filters=${filters}` : ''}`;

  const res = await fetch(url);

  let candidates;
  let positionNames;
  try {
    ({ candidates, positionNames } = await res.json());
  } catch (e) {
    candidates = [];
    positionNames = [];
  }

  return {
    props: {
      ssrState: {
        candidates,
        filters: filters || '',
        positionNames,
      },
    },
  };
}
