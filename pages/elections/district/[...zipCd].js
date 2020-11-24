import Page from 'containers/elections/DistrictPage';
import tgpApi from 'api/tgpApi';

export default function Party({ ssrState }) {
  console.log('page props', ssrState);
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const api = tgpApi.allPresidential;
  const res = await fetch(api.url);
  const data = await res.json();

  const api2 = tgpApi.content;
  const res2 = await fetch(api2.url);
  const data2 = await res2.json();
  const content = {
    faqArticles: data2.faqArticles,
  };
  return {
    props: {
      ssrState: {
        presidential: data.presidential,
        content,
      },
    }, // will be passed to the page component as props
  };
}
