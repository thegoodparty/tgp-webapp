import PartyPage from '/containers/party/PartyPage';
import tgpApi from '/api/tgpApi';

export default function Party({ ssrState }) {
  return <PartyPage ssrState={ssrState} />;
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

  const api2 = tgpApi.contentByKey;

  let pageContent;
  try {
    const res2 = await fetch(`${api2.url}?key=partyPage`);

    pageContent = (await res2.json()).content;
    console.log('pageContent', pageContent, `${api2.url}?key=partyPage`);
  } catch (e) {
    pageContent = false;
  }

  return {
    props: {
      ssrState: {
        candidates: homepageCandidates,
        pageContent,
      },
    }, // will be passed to the page component as props
  };
}
