import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// returns only articles that match the page.
const contentfulHelper = rawRichTextField => {
  try {
    let doc = rawRichTextField;
    if (typeof doc === 'string') {
      doc = JSON.parse(rawRichTextField);
    }
    return documentToReactComponents(doc);
  } catch (e) {
    console.log('error at helper');
    console.log(e);
    return '';
  }
};

export default contentfulHelper;
