import styled from 'styled-components';

const MaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

export default MaxWidth;
