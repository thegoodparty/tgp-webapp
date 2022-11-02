import Page from '/containers/blog/BlogHomePage';
import tgpApi from '/api/tgpApi';
export default function FaqList({ ssrState }) {
  return <Page ssrState={ssrState} />;
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.params;

    const api = tgpApi.contentByKey;
    const url = `${api.url}?key=blogSections`;
    const res = await fetch(url);

    const { content } = await res.json();

    let articles = [];
    let sectionTitle;
    for (let i = 0; i < content.length; i++) {
      const section = content[i];
      if (section.fields?.slug === slug) {
        articles = section.articles;
        sectionTitle = section.fields.title;
        break;
      }
    }

    return {
      props: {
        ssrState: {
          sections: content,
          sectionSlug: slug,
          articles,
          sectionTitle,
        },
      },
    };
  } catch (e) {
    return {
      props: {
        ssrState: {
          sections: [],
          sectionSlug: '',
          sectionTitle: '',
          articles: [],
        },
      },
    };
  }
}
