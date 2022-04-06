import styled from 'styled-components';

const FontH1 = styled.h1`
  font-size: 32px;
  letter-spacing: 0.2px;
  font-weight: 900;
  font-family: ${({ theme }) => theme.typography.fontFamily};

  @media only screen and (min-width: ${({ theme }) =>
      theme.breakpointsPixels.md}) {
    font-size: 40px;
  }
`;

export default FontH1;
