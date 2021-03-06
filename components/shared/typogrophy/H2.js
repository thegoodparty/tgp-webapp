import styled from 'styled-components';

const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 23px;
  line-height: 30px;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 28px;
    line-height: 36px;
  }
`;

export default H2;
