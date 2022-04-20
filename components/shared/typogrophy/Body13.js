import styled from 'styled-components';

const Body13 = styled.div`
  color: #000;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: 0.1px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export default Body13;
