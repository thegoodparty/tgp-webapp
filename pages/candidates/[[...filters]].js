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
  let totalFollowers = 0;
  let totalFromLastWeek = 0;
  let totalSupport = 0;
  let totalSupportFromLastWeek = 0;

  let states;
  try {
    ({
      candidates,
      positions,
      states,
      totalFollowers,
      totalFromLastWeek,
      totalSupport,
      totalSupportFromLastWeek,
    } = await res.json());
  } catch (e) {
    candidates = [];
    positions = [];
    states = [];
    totalFollowers = 0;
    totalFromLastWeek = 0;
  }

  return {
    props: {
      ssrState: {
        candidates: candidates || [],
        positions: positions || [],
        states: states || [],
        routePosition: position || '',
        routeState: state || '',
        totalFollowers: totalFollowers + totalSupport,
        totalFromLastWeek: totalFromLastWeek + totalSupportFromLastWeek,
      },
    },
  };
}
