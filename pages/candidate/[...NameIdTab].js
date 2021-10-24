import CandidatePage from 'containers/elections/CandidateNewPage';
import tgpApi from 'api/tgpApi';

export default function Candidate({ ssrState }) {
  return <CandidatePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  // x-real-ip
  // const ip = req.connection.remoteAddress
  const { NameIdTab } = context.params;
  // const name = NameIdTab?.length > 1 ? NameIdTab[0] : false;
  const id = NameIdTab?.length > 1 ? NameIdTab[1] : false;
  const tab = NameIdTab?.length > 2 ? NameIdTab[2] : false;
  if (id && id !== 'undefined' && typeof id !== 'undefined') {
    const api = tgpApi.newCandidate.find;
    const url = `${api.url}?id=${id}`;
    const res = await fetch(url);
    let candidate;
    try {
      candidate = await res.json();
    } catch (e) {
      candidate = {
        candidate: {},
      };
    }

    const api2 = tgpApi.admin.topics.list;
    const res2 = await fetch(`${api2.url}?format=hash`);
    let topics = [];
    try {
      ({ topics } = await res2.json());
    } catch (e) {}

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          id,
          tab,
          topics,
          userAgent: context.req.headers['user-agent'],
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
