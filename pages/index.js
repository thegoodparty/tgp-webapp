import HomePage from 'containers/HomePage';
import tgpApi from 'api/tgpApi';

export default function Home({ ssrState }) {
  return <HomePage ssrState={ssrState} />;
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
        homepageCandidates,
      },
    }, // will be passed to the page component as props
  };
}
