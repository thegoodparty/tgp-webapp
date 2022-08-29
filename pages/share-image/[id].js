import ShareImagePage from '/containers/elections/ShareImageContainer';
import tgpApi from '/api/tgpApi';
export default function Candidate({ ssrState }) {
  return <ShareImagePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (id) {
    let candidate;
    try {
      const api = tgpApi.newCandidate.find;
      const url = `${api.url}?id=${id}&withImage=true&allFields=true`;
      const res = await fetch(url);
      candidate = await res.json();
    } catch (e) {
      candidate = {};
    }
    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          imageAsBase64: candidate.imageAsBase64
            ? candidate.imageAsBase64
            : null,
          followers: candidate.followers,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
