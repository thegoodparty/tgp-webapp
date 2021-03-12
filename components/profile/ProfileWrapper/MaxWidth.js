import styled from 'styled-components';

const MaxWidth = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.contentMax};
  margin: 0 auto;
`;

export default MaxWidth;
