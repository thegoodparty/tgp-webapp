import CandidatePage from '/containers/CandidatePage';
import tgpApi from '/api/tgpApi';

export default function Candidate({ ssrState }) {
  return <CandidatePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  // x-real-ip
  // const ip = req.connection.remoteAddress
  const { NameIdTab } = context.params;
  const id = NameIdTab?.length > 1 ? NameIdTab[1] : false;
  const tab = NameIdTab?.length > 2 ? NameIdTab[2] : 'Feed';
  if (id && id !== 'undefined' && typeof id !== 'undefined') {
    const api = tgpApi.newCandidate.find;
    const url = `${api.url}?id=${id}&allFields=true`;
    const res = await fetch(url);
    let candidate;
    try {
      candidate = await res.json();
    } catch (e) {
      candidate = {
        candidate: {},
      };
    }

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          candidatePositions: candidate.candidatePositions || [],
          similarCampaigns: candidate.similarCampaigns || [],
          id,
          userAgent: context.req.headers['user-agent'],
          tab,
          followers: candidate.followers,
          feed: candidate.feed || {},
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
