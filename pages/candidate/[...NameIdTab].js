import CandidatePage from 'containers/elections/CandidateNewPage';
import tgpApi from 'api/tgpApi';
export default function Candidate({ ssrState }) {
  return <CandidatePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { NameIdTab } = context.params;
  // const name = NameIdTab?.length > 1 ? NameIdTab[0] : false;
  const id = NameIdTab?.length > 1 ? NameIdTab[1] : false;
  const tab = NameIdTab?.length > 2 ? NameIdTab[2] : false;

  if (id) {
    const api = tgpApi.findNewCandidate;
    const url = `${api.url}?id=${id}`;
    const res = await fetch(url);
    const candidate = await res.json();

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          id,
          tab,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
