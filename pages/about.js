import PartyPage from 'containers/party/PartyPage';
import tgpApi from 'api/tgpApi';

export default function Party({ ssrState }) {
  return <PartyPage ssrState={ssrState} />;
}

export async function getServerSideProps() {

  const api = tgpApi.homepageCandidates;
  const res = await fetch(api.url);

  const { homepageCandidates } = await res.json();
  return {
    props: {
      ssrState: {
        candidates: homepageCandidates,
      },
    }, // will be passed to the page component as props
  };
}
