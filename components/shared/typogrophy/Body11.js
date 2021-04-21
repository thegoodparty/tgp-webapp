import styled from 'styled-components';

const Body11 = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0.5px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export default Body11;
