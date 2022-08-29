import Page from '/containers/CandidatesPage';
import tgpApi from '/api/tgpApi';

export default function Candidates({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const api = tgpApi.newCandidate.list;
  const { filters } = context.params;
  const position = filters?.length > 0 ? filters[0] : false;
  const state = filters?.length > 1 ? filters[1] : false;
  let url = api.url;
  if (position) {
    url += `?position=${position}`;
  }
  if (state) {
    url += `&state=${state}`;
  }
  const res = await fetch(url);

  let candidates;
  let positions;

  let states;
  try {
    ({ candidates, positions, states } = await res.json());
  } catch (e) {
    candidates = [];
    positions = [];
    states = [];
  }

  return {
    props: {
      ssrState: {
        candidates: candidates || [],
        positions: positions || [],
        states: states || [],
        routePosition: position || '',
        routeState: state || '',
      },
    },
  };
}
