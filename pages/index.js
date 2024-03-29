import HomePage from '/containers/HomePage';
import tgpApi from '/api/tgpApi';

const PULSAR_SEARCH_ID = '86f3d427847eb953d2cbba3ba681a372';

export default function Home({ ssrState }) {
  return <HomePage ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  // const utmContent = context.query.utm_content || '';
  // const utmSource = context.query.utm_source || '';

  const api = tgpApi.followers;

  let totalFollowers = 41858;
  try {
    const res = await fetch(api.url);
    const response = await res.json();
    totalFollowers = response.total;
  } catch (e) {
    totalFollowers = 41858;
  }

  const api3 = tgpApi.homepageCandidates;

  let homepageCandidates;
  try {
    const res3 = await fetch(api3.url);
    ({ homepageCandidates } = await res3.json());
  } catch (e) {
    homepageCandidates = [];
  }

  return {
    props: {
      ssrState: {
        totalFollowers,
        homepageCandidates,
      },
    },
  };
}
