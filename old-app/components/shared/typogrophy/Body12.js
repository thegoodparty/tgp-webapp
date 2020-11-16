import styled from 'styled-components';

const Body12 = styled.div`
  color: ${({ theme }) => theme.colors.gray6};
  font-size: 12px;
  line-height: 17px;
  letter-spacing: 0.1px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export default Body12;
