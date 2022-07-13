import HomePage from '/containers/HomePage';
import tgpApi from '/api/tgpApi';

export default function Home({ ssrState }) {
  return <HomePage ssrState={ssrState} />;
}


export async function getServerSideProps(context) {
  const utmContent = context.query.utm_content || '';
  const utmSource = context.query.utm_source || '';

  const api = tgpApi.followers;

  let totalFollowers = 41858;
  try {
    const res = await fetch(api.url);
    const response = await res.json();
    totalFollowers = response.total;
  } catch (e) {
    totalFollowers = 41858;
  }

  const api2 = tgpApi.feed;

  let feed;
  try {
    const res2 = await fetch(
      `${api2.url}?searchId=2bade780970fd5134f8bd216b568bc8e&limit=4&useCache=true&save=true`,
    );
    const response2 = await res2.json();
    feed = response2;
  } catch (e) {
    feed = {
      results: {
        total: 0,
        results: [],
      },
    };
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
        utmContent,
        utmSource,
        totalFollowers,
        feed,
        homepageCandidates,
      },
    },
  };
}
