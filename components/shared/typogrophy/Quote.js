import styled from 'styled-components';

const Quote = styled.p`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 33px;
  line-height: 43px;
  font-style: italic;
  font-weight: bold;
  margin: 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpointsPixels.md}) {
    font-size: 48px;
    line-height: 56px;
  }
`;

export default Quote;
