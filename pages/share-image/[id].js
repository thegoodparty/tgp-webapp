import ShareImagePage from 'containers/elections/ShareImageContainer';
import tgpApi from 'api/tgpApi';
export default function Candidate({ ssrState }) {
  return <ShareImagePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  if (id) {
    const api = tgpApi.newCandidate.find;
    const url = `${api.url}?id=${id}&withImage=true`;
    const res = await fetch(url);
    const candidate = await res.json();

    const api2 = tgpApi.supportCandidate.candidateSupports;
    const url2 = `${api2.url}?candidateId=${id}`;
    const res2 = await fetch(url2);
    const { candidateSupports } = await res2.json();

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          imageAsBase64: candidate.imageAsBase64
            ? candidate.imageAsBase64
            : null,
          candidateSupports,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
