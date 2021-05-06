import styled from 'styled-components';
const StyledH3 = styled.h3`
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 24px;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 400;

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 19px;
    line-height: 25px;
    margin-top: 8px;
  }

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.lg}) {
    font-size: 27px;
    line-height: 32px;
    margin-bottom: 40px;
  }
`;

export default StyledH3;
