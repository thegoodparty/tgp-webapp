import Page from 'containers/DynamicLandingPage';
import tgpApi from '../../api/tgpApi';
export default function LP({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  const api = tgpApi.landingPageContent;
  const { slug } = context.params;
  const url = `${api.url}?slug=${slug}`;

  const res = await fetch(url);

  const { content } = await res.json();
  return {
    props: {
      ssrState: {
        content,
      },
    }, // will be passed to the page component as props
  };
}
