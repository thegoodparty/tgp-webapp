import styled from 'styled-components';

const H1 = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 27px;
  line-height: 35px;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 36px;
    line-height: 42px;
  }
`;

export default H1;
