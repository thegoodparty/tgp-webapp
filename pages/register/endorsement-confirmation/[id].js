import Container from '/containers/entrance/EndorsementConfirmationPage';
import tgpApi from '/api/tgpApi';
export default function Page({ ssrState }) {
  return <Container ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
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

    const api2 = tgpApi.supportCandidate.candidateSupports;
    const url2 = `${api2.url}?candidateId=${id}`;
    const res2 = await fetch(url2);
    let candidateSupports;
    let total;
    try {
      ({ candidateSupports, total } = await res2.json());
    } catch (e) {
      candidateSupports = 0;
      total = 0;
    }

    return {
      props: {
        ssrState: {
          candidate: candidate.candidate,
          id,
          candidateSupports,
          total,
        },
      }, // will be passed to the page component as props
    };
  }
  return {
    props: {},
  };
}
