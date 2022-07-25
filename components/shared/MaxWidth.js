import styled from 'styled-components';

const MaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

export const Padder = styled.div`
  padding: 0 20px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.contentMax}) {
    padding: 0;
  }
`;

export default MaxWidth;
