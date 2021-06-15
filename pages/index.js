import HomePage from 'containers/HomePage';
import tgpApi from 'api/tgpApi';

export default function Home({ ssrState }) {
  return <HomePage ssrState={ssrState} />;
}

export async function getServerSideProps() {
  const api = tgpApi.homepageCandidates;
  const res = await fetch(api.url);

  let homepageCandidates;
  try {
    ({ homepageCandidates } = await res.json());
  } catch (e) {
    // context.res.writeHead(404);
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
