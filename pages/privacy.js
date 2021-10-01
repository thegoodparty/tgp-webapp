import PrivacyPage from 'containers/shared/PrivacyPage';
import tgpApi from '../api/tgpApi';
export default function Privacy({ ssrState }) {
  return <PrivacyPage ssrState={ssrState} />;
}

export async function getServerSideProps() {
  try {
    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=privacyPage`;
    const res = await fetch(url);

    const { content } = await res.json();
    return {
      props: {
        ssrState: {
          content,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        ssrState: {
          content: {},
        },
      },
    };
  }
}
