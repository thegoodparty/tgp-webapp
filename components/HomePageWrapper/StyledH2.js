import styled from 'styled-components';
const StyledH2 = styled.h2`
  color: #000;
  font-size: 23px;
  line-height: 30px;
  font-weight: 700;
  margin: 0 0 4px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 48px;
    line-height: 52px;
    margin-bottom: 8px;
  }
`;

export default StyledH2;
