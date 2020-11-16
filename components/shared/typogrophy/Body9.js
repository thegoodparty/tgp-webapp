import styled from 'styled-components';

const Body9 = styled.div`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 9px;
  line-height: 12px;
  letter-spacing: 0.5px;
  font-weight: 500;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 12px;
    line-height: 15px;
  }
`;

export default Body9;
