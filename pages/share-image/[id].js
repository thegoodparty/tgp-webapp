import ShareImagePage from '/containers/elections/ShareImageContainer';
import tgpApi from '/api/tgpApi';
export default function Candidate({ ssrState }) {
  return <ShareImagePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (id) {
    let candidateSupports;
    let total;
    let candidate;
    try {
      const api = tgpApi.newCandidate.find;
      const url = `${api.url}?id=${id}&withImage=true&allFields=true`;
      const res = await fetch(url);
      candidate = await res.json();

      const api2 = tgpApi.supportCandidate.candidateSupports;
      const url2 = `${api2.url}?candidateId=${id}`;
      const res2 = await fetch(url2);
      ({ candidateSupports, total } = await res2.json());
    } catch (e) {
      candidateSupports = 0;
      total = 0;
      candidate = {};
    }
    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          imageAsBase64: candidate.imageAsBase64
            ? candidate.imageAsBase64
            : null,
          candidateSupports,
          total,
          followers: candidate.followers,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
