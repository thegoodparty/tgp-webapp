import styled from 'styled-components';

const Body = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.1px;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 20px;
    line-height: 26px;
  }
`;

export default Body;
