import EndorseIframe from 'components/EndorseIframe';
import tgpApi from 'api/tgpApi';

export default function Embed({ ssrState }) {
  return <EndorseIframe ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  if (id) {
    const api = tgpApi.newCandidate.find;
    const url = `${api.url}?id=${id}`;
    const res = await fetch(url);
    const candidate = await res.json();

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          id,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
