import tgpApi from '/api/tgpApi';
import RedirectPage from '/containers/elections/RedirectPage';

export default function Embed({ ssrState }) {
  return <RedirectPage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  if (id) {
    const api = tgpApi.newCandidate.find;
    const url = `${api.url}?id=${id}`;
    const res = await fetch(url);
    let candidate;
    try {
      candidate = await res.json();
      // track click
      const api2 = tgpApi.newCandidate.endorseButton.click;
      const url2 = `${api2.url}?id=${id}`;
      await fetch(url2);
    } catch (e) {
      candidate = {
        candidate: {},
      };
    }
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
