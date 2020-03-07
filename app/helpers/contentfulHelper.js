import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// returns only articles that match the page.
const contentfulHelper = rawRichTextField => {
  try {
    return documentToReactComponents(JSON.parse(rawRichTextField));
  } catch (e) {
    return '';
  }
};

export default contentfulHelper;
