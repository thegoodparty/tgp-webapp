import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray4};
  font-size: 27px;
  line-height: 35px;
  font-weight: bold;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 40px;
    line-height: 52px;
  }
`;

export default Title;
