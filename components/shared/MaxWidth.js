import styled from 'styled-components';

const MaxWidth = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Padder = styled.div`
  padding: 0 20px;
  @media only screen and (min-width: 1280px) {
    padding: 0;
  }
`;

export default MaxWidth;
