import Page from '/containers/AboutPage';
import tgpApi from '/api/tgpApi';

export default function Party({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.homepageCandidates;

  let homepageCandidates;
  try {
    const res = await fetch(api.url);

    ({ homepageCandidates } = await res.json());
  } catch (e) {
    homepageCandidates = [];
  }

  return {
    props: {
      ssrState: {
        candidates: homepageCandidates,
      },
    }, // will be passed to the page component as props
  };
}
