import styled from 'styled-components';
const StyledH2 = styled.h2`
  color: #000;
  font-size: 23px;
  line-height: 30px;
  font-weight: 700;
  margin: 0 0 4px;
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 30px;
    line-height: 35px;
    margin-bottom: 8px;
  }
  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 40px;
    line-height: 48px;
  }
`;

export default StyledH2;
