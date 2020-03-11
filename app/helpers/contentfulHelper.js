import styled from 'styled-components';
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

export const CmsContentWrapper = styled.div`
  margin-top: 28px;
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.1px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 20px;
    line-height: 26px;
  }
  h3 {
    margin-top: 28px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 19px;
    line-height: 25px;
    font-weight: 600;
    margin: 0;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 26px;
      line-height: 32px;
    }
  }
  p {
    color: ${({ theme }) => theme.colors.gray4};
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.1px;
    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 20px;
      line-height: 26px;
    }
  }
`;

export default contentfulHelper;
