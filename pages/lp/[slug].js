import content from 'containers/App/content';
import Page from 'containers/DynamicLandingPage';
export default function LP({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      ssrState: {
        content,
      },
    }, // will be passed to the page component as props
  };
}
