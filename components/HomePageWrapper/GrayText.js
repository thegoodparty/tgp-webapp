import styled from 'styled-components';

const GrayText = styled.div`
  color: ${({ theme }) => theme.colors.gray7};
  font-size: 19px;
  line-height: 25px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 23px;
    line-height: 30px;
  }
`;

export default GrayText;
