import Page from '/containers/CandidatesPage';
import tgpApi from '/api/tgpApi';

export default function Candidates({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const api = tgpApi.newCandidate.list;
  const { filters } = context.params;
  const filter = filters?.length > 0 ? filters[0] : false;
  const url = `${api.url}${filter ? `?filters=${filter}` : ''}`;

  const res = await fetch(url);

  let candidates;
  let positionNames;
  let topIssues;
  try {
    ({ candidates, positionNames, topIssues } = await res.json());
    console.log('topIssues here', topIssues);
  } catch (e) {
    console.log('error on candiddates filters', e);
    candidates = [];
    positionNames = [];
    topIssues = [];
  }

  return {
    props: {
      ssrState: {
        candidates,
        filters: filter || '',
        positionNames,
        topIssues,
      },
    },
  };
}
