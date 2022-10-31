import Page from '/containers/blog/BlogHomePage';
import tgpApi from '/api/tgpApi';
export default function FaqList({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps() {
  try {
    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=blogSections`;
    const res = await fetch(url);

    const { content } = await res.json();
    return {
      props: {
        ssrState: {
          sections: content,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        ssrState: {
          sections: [],
        },
      },
    };
  }
}
