import CandidatePage from '/containers/CandidatePage';
import tgpApi from '/api/tgpApi';
import { candidateRoute } from '../../helpers/electionsHelper';

export default function Candidate({ ssrState }) {
  return <CandidatePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  // x-real-ip
  // const ip = req.connection.remoteAddress
  const { NameIdTab } = context.params;
  const name = NameIdTab?.length > 0 ? NameIdTab[0] : false;
  const id = NameIdTab?.length > 1 ? NameIdTab[1] : false;
  const tab = NameIdTab?.length > 2 ? NameIdTab[2] : false;
  if (tab) {
    const { res } = context;
    res.setHeader('Location', `/candidate/${name}/${id}`);
    res.statusCode = 301;
    res.end();
    return {
      props: {},
    };
  }

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

    // check if the route and id match
    if (!candidate || !candidate.candidate) {
      return { notFound: true };
    }
    if (candidateRoute(candidate.candidate) !== `/candidate/${name}/${id}`) {
      const { res } = context;
      res.setHeader('Location', candidateRoute(candidate.candidate));
      res.statusCode = 301;
      res.end();
      return {
        props: {},
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
