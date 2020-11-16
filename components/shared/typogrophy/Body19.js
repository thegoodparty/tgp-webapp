import styled from 'styled-components';

const Body19 = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 19px;
  line-height: 25px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 23px;
    line-height: 30px;
  }
`;

export default Body19;
